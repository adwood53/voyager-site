// src/app/api/webhooks/clerk/route.js
import { Webhook } from 'svix';
import { headers } from 'next/headers';
import {
  createOrUpdateUser,
  createOrganization,
  updateOrganization,
  getOrganizationByClerkId,
} from '@/src/lib/firestore';

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

    const primaryEmail =
      email_addresses?.length > 0
        ? email_addresses[0].email_address
        : '';

    const userData = {
      clerkId: id,
      displayName:
        `${first_name || ''} ${last_name || ''}`.trim() || 'User',
      email: primaryEmail,
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
    const { id, name, slug, image_url } = evt.data;

    await createOrganization({
      clerkOrgId: id,
      name,
      slug: slug || '',
      logo: image_url || '',
      primaryColor: '#E79023', // Default Voyager primary
      secondaryColor: '#a6620c', // Default Voyager accent
      textColor: '#333333',
      bgColor: '#FFFFFF',
      cardBgColor: '#F8F9FA',
      borderColor: '#E2E8F0',
      members: [],
    });

    return new Response('Organization created in Firebase', {
      status: 200,
    });
  }

  if (eventType === 'organization.updated') {
    const { id, name, slug, image_url } = evt.data;

    // Get Firebase organization ID from Clerk ID
    const existingOrg = await getOrganizationByClerkId(id);

    if (existingOrg) {
      await updateOrganization(existingOrg.id, {
        name,
        slug: slug || existingOrg.slug || '',
        logo: image_url || existingOrg.logo || '',
        // Preserve existing styles
        primaryColor: existingOrg.primaryColor || '#E79023',
        secondaryColor: existingOrg.secondaryColor || '#a6620c',
        textColor: existingOrg.textColor || '#333333',
        bgColor: existingOrg.bgColor || '#FFFFFF',
        cardBgColor: existingOrg.cardBgColor || '#F8F9FA',
        borderColor: existingOrg.borderColor || '#E2E8F0',
      });
    } else {
      // Create the organization if it doesn't exist
      await createOrganization({
        clerkOrgId: id,
        name,
        slug: slug || '',
        logo: image_url || '',
        primaryColor: '#E79023',
        secondaryColor: '#a6620c',
        textColor: '#333333',
        bgColor: '#FFFFFF',
        cardBgColor: '#F8F9FA',
        borderColor: '#E2E8F0',
        members: [],
      });
    }

    return new Response('Organization updated in Firebase', {
      status: 200,
    });
  }

  // Handle organization membership events
  if (eventType === 'organizationMembership.created') {
    // You could track members here if needed
    return new Response('Organization membership event received', {
      status: 200,
    });
  }

  // Return a 200 response for unhandled events
  return new Response('Webhook received', { status: 200 });
}
