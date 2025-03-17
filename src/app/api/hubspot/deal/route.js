// src/app/api/hubspot/deal/route.js
import { NextResponse } from 'next/server';
import { Client } from '@hubspot/api-client';

export const POST = async (req) => {
  try {
    const hubspotClient = new Client({
      accessToken: process.env.HUBSPOT_API_KEY,
    });

    const body = await req.json();
    const {
      contactDetails,
      configurationData,
      calculatorType = 'generic',
      salesPersonId,
    } = body;

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

    // Format features and commissions for HubSpot
    const featureString = Array.isArray(configurationData.features)
      ? configurationData.features
          .map((feature) => {
            if (Array.isArray(feature)) {
              return `${feature[0]}: ${feature[1]}`;
            } else if (typeof feature === 'object') {
              return `${feature.name || 'Feature'}: ${feature.value || 'Yes'}`;
            } else {
              return feature;
            }
          })
          .join('\n')
      : '';

    const commissionString = Array.isArray(
      configurationData.commissionItems
    )
      ? configurationData.commissionItems.join('\n') || 'None'
      : 'None';

    // Step 2: Create a deal and associate it with the contact
    const dealProperties = {
      dealname: `${contactDetails.firstName} ${contactDetails.lastName} - ${calculatorType} Configuration`,
      pipeline: 'default',
      dealstage: 'appointmentscheduled',
      amount: configurationData.pricing?.basePrice?.toString() || '0',
      configuration_tier:
        configurationData.pricing?.tier?.toString() || '1',
      configuration_type__ar_vr_: calculatorType,
      configuration_features: featureString,
      items_to_be_commissioned: commissionString,
      project_details:
        configurationData.summary?.projectDetails || '',
      project_link: configurationData.immersionLink || '',
      brandsource: contactDetails.brandsource || 'voyager',
    };

    // Include salesperson_id if provided
    if (salesPersonId) {
      dealProperties.salesperson_id = salesPersonId;
    }

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
        details: error.response?.data || error.toString(),
      },
      { status: 500 }
    );
  }
};
