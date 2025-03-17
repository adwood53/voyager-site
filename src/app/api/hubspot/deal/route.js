//src/app/api/hubspot/create-deal/route.js
import { NextResponse } from 'next/server';
import { Client } from '@hubspot/api-client';

export const POST = async (req) => {
  try {
    const hubspotClient = new Client({
      accessToken: process.env.HUBSPOT_API_KEY,
    });

    const body = await req.json();
    const { contactDetails, configurationData } = body;

    let contactId;

    // Step 1: Check if the contact already exists by email
    try {
      const contactSearch =
        await hubspotClient.crm.contacts.searchApi.doSearch({
          filterGroups: [
            {
              filters: [
                {
                  propertyName: 'email',
                  operator: 'EQ',
                  value: contactDetails.email,
                },
              ],
            },
          ],
          properties: ['email', 'firstname', 'lastname'],
        });

      if (contactSearch.results.length > 0) {
        // Contact exists
        contactId = contactSearch.results[0].id;
        console.log(`Contact already exists: ${contactId}`);
      } else {
        // Contact doesn't exist, create a new one
        const contactProperties = {
          email: contactDetails.email,
          firstname: contactDetails.firstName,
          lastname: contactDetails.lastName,
          phone: contactDetails.phoneNumber,
          company: contactDetails.companyName,
          how_did_you_hear_about_us: contactDetails.sourceInfo,
        };

        console.log(
          'Creating contact with properties:',
          contactProperties
        );

        const contact =
          await hubspotClient.crm.contacts.basicApi.create({
            properties: contactProperties,
          });

        contactId = contact.id;
        console.log('Contact created successfully:', contactId);
      }
    } catch (contactError) {
      console.error(
        'Error checking or creating contact:',
        contactError.response?.data || contactError
      );
      throw new Error('Failed to check or create contact.');
    }

    // Populate the final property strings
    const featureString = configurationData.features
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');

    const commissionString =
      configurationData.commissionItems.join('\n') || 'None';

    const projectDetails = contactDetails.projectDetails || '';

    // Step 2: Create a deal and associate it with the contact
    const dealProperties = {
      dealname: `${contactDetails.firstName} ${contactDetails.lastName} - ${configurationData.summary.type} Configuration`,
      pipeline: 'default',
      dealstage: 'appointmentscheduled',
      amount: configurationData.pricing.basePrice.toString(),
      configuration_tier: configurationData.pricing.tier.toString(),
      configuration_type__ar_vr_: configurationData.summary.type,
      configuration_features: featureString,
      items_to_be_commissioned: commissionString,
      project_details: configurationData.summary.projectDetails,
      project_link: configurationData.immersionLink,
      brandsource: contactDetails.brandsource,
    };

    console.log('Creating deal with properties:', dealProperties);

    const deal = await hubspotClient.crm.deals.basicApi.create({
      properties: dealProperties,
      associations: [
        {
          to: { id: contactId, type: 'contact' },
          types: [
            {
              associationCategory: 'HUBSPOT_DEFINED',
              associationTypeId: 3,
            },
          ],
        },
      ],
    });

    console.log('Deal created successfully:', deal);

    return NextResponse.json({
      message: 'Deal created successfully',
      dealId: deal.id,
      contactId: contactId,
    });
  } catch (error) {
    console.error('API route error:', error.response?.data || error);
    return NextResponse.json(
      {
        error: error.message,
        details: error.response?.data || error,
      },
      { status: 500 }
    );
  }
};
