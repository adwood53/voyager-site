// src/app/api/hubspot/deal/route.js
import { NextResponse } from 'next/server';
import { Client } from '@hubspot/api-client';

export async function POST(req) {
  try {
    const hubspotClient = new Client({
      accessToken: process.env.HUBSPOT_API_KEY,
    });

    const body = await req.json();
    const { contactDetails, configurationData, calculatorType } =
      body;

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

    // Format features for HubSpot - handle different structures
    let featureString = '';
    if (Array.isArray(configurationData.features)) {
      // Map features to clean string
      featureString = configurationData.features
        .map((feature) => {
          if (Array.isArray(feature)) {
            return `${feature[0]}: ${feature[1]}`;
          } else if (
            typeof feature === 'object' &&
            feature !== null
          ) {
            return `${feature.name || 'Feature'}: ${feature.value || 'Yes'}`;
          } else {
            return String(feature);
          }
        })
        .join('\n');
    }

    // Format commission items for HubSpot
    const commissionString = Array.isArray(
      configurationData.commissionItems
    )
      ? configurationData.commissionItems.join('\n')
      : 'None';

    // Get the total cost from the calculator
    const totalPrice =
      configurationData.pricing?.totalPrice ||
      configurationData.pricing?.basePrice ||
      0;

    // Configuration type
    const configurationType =
      calculatorType ||
      configurationData.summary?.type ||
      configurationData.summary?.configurationType ||
      'Merchandise';

    const combinedProjectDetails = `
      Project Name: ${contactDetails.projectName || ''}
      
      Project Purpose: ${contactDetails.projectPurpose || ''}
      
      Additional Details: ${contactDetails.projectDetails || ''}
      
      How They Found Us: ${contactDetails.sourceInfo || ''}
      `.trim();

    // Step 2: Create a deal and associate it with the contact
    const dealProperties = {
      dealname: `${contactDetails.firstName} ${contactDetails.lastName} - ${configurationType} Configuration`,
      pipeline: 'default',
      dealstage: 'appointmentscheduled',
      amount: totalPrice.toString(),
      configuration_tier: (
        configurationData.summary?.tier || 1
      ).toString(),
      configuration_type__ar_vr_: configurationType,
      configuration_features: featureString,
      items_to_be_commissioned: commissionString,
      project_link: '', // Blank as specified
      brandsource: contactDetails.brandsource,
      project_details: combinedProjectDetails,
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
}
