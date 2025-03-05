import { Webhook } from 'svix';
import { headers } from 'next/headers';
import {
  createOrUpdateUser,
  createOrganization,
  updateOrganization,
  getOrganizationByClerkId,
} from '@/lib/firestore';

export async function POST(req) {
  // Get the signature and timestamp from the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get('svix-id');
  const svix_timestamp = headerPayload.get('svix-timestamp');
  const svix_signature = headerPayload.get('svix-signature');

  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error: Missing svix headers', {
      status: 400,
    });
  }

  // Get the body
  const payload = await req.json();
  const body = JSON.stringify(payload);

  // Create a new Svix instance with your webhook secret
  const wh = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

  let evt;
  try {
    // Verify the payload with the headers
    evt = wh.verify(body, {
      'svix-id': svix_id,
      'svix-timestamp': svix_timestamp,
      'svix-signature': svix_signature,
    });
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error verifying webhook', { status: 400 });
  }

  // Handle the webhook based on the event type
  const eventType = evt.type;

  // User events
  if (eventType === 'user.created' || eventType === 'user.updated') {
    const { id, first_name, last_name, email_addresses, image_url } =
      evt.data;

    const userData = {
      clerkId: id,
      displayName:
        `${first_name || ''} ${last_name || ''}`.trim() || 'User',
      email: email_addresses?.[0]?.email_address || '',
      avatar: image_url || '',
      type: 'individual', // Default to individual user
      isReseller: false, // Default to not a reseller
    };

    await createOrUpdateUser(userData);
    return new Response('User created/updated in Firebase', {
      status: 200,
    });
  }

  // Organization events
  if (eventType === 'organization.created') {
    const { id, name, slug } = evt.data;

    await createOrganization({
      clerkOrgId: id,
      name,
      subdomain: slug,
      logo: '', // Default empty, Clerk will store the actual logo
      primaryColor: '#E79023', // Voyager primary
      secondaryColor: '#a6620c', // Voyager accent
      members: [],
    });

    return new Response('Organization created in Firebase', {
      status: 200,
    });
  }

  if (eventType === 'organization.updated') {
    const { id, name, slug } = evt.data;

    // Get Firebase organization ID from Clerk ID
    const existingOrg = await getOrganizationByClerkId(id);

    if (!existingOrg) {
      return new Response('Organization not found', { status: 404 });
    }

    await updateOrganization(existingOrg.id, {
      name,
      subdomain: slug,
    });

    return new Response('Organization updated in Firebase', {
      status: 200,
    });
  }

  // Return a 200 response for unhandled events
  return new Response('Webhook received', { status: 200 });
}
