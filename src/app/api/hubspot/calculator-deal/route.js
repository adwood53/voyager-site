// src/app/api/hubspot/create-deal/route.js

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
      organizationId,
    } = body;

    let contactId;
    let salesPersonContactId;

    // Step 1: Check if the client contact already exists by email
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
        console.log(`Client contact already exists: ${contactId}`);
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
          'Creating client contact with properties:',
          contactProperties
        );

        const contact =
          await hubspotClient.crm.contacts.basicApi.create({
            properties: contactProperties,
          });

        contactId = contact.id;
        console.log(
          'Client contact created successfully:',
          contactId
        );
      }
    } catch (contactError) {
      console.error(
        'Error checking or creating client contact:',
        contactError.response?.data || contactError
      );
      throw new Error('Failed to check or create client contact.');
    }

    // Step 2: If salesPersonId is provided, check or create salesperson contact
    if (salesPersonId) {
      try {
        // Attempt to find the salesperson contact
        const salesPersonSearch =
          await hubspotClient.crm.contacts.searchApi.doSearch({
            filterGroups: [
              {
                filters: [
                  {
                    propertyName: 'hs_additional_emails',
                    operator: 'CONTAINS_TOKEN',
                    value: salesPersonId,
                  },
                ],
              },
            ],
            properties: ['email', 'firstname', 'lastname'],
          });

        if (salesPersonSearch.results.length > 0) {
          // Salesperson contact exists
          salesPersonContactId = salesPersonSearch.results[0].id;
          console.log(
            `Salesperson contact already exists: ${salesPersonContactId}`
          );
        } else {
          // Create a placeholder for the salesperson if not found
          // This would be updated by a webhook from Clerk later
          const salesPersonProperties = {
            email: `${salesPersonId}@placeholder.voyager`,
            firstname: 'Voyager',
            lastname: 'Partner',
            hs_additional_emails: salesPersonId,
          };

          console.log(
            'Creating salesperson contact with properties:',
            salesPersonProperties
          );

          const salesPersonContact =
            await hubspotClient.crm.contacts.basicApi.create({
              properties: salesPersonProperties,
            });

          salesPersonContactId = salesPersonContact.id;
          console.log(
            'Salesperson contact created successfully:',
            salesPersonContactId
          );
        }
      } catch (salesPersonError) {
        console.error(
          'Error checking or creating salesperson contact:',
          salesPersonError.response?.data || salesPersonError
        );
        // Don't throw here, proceed without salesperson
        console.log('Proceeding without salesperson contact');
      }
    }

    // Populate the final property strings for the deal
    const featureString = Array.isArray(configurationData.features)
      ? configurationData.features
          .map((feature) => {
            if (Array.isArray(feature)) {
              return `${feature[0]}: ${feature[1]}`;
            }
            return feature;
          })
          .join('\n')
      : '';

    const commissionString = Array.isArray(
      configurationData.commissionItems
    )
      ? configurationData.commissionItems.join('\n') || 'None'
      : 'None';

    const projectDetails = contactDetails.projectDetails || '';

    // Determine deal type based on calculatorType
    let pipeline = 'default';
    let dealstage = 'appointmentscheduled';

    if (calculatorType === 'merchandise') {
      pipeline = 'merchandise_pipeline';
      dealstage = 'merchandise_submitted';
    } else if (calculatorType === 'productions') {
      pipeline = 'productions_pipeline';
      dealstage = 'production_requested';
    }

    // Step 3: Create a deal and associate it with the contact(s)
    const dealProperties = {
      dealname: `${contactDetails.firstName} ${contactDetails.lastName} - ${configurationData.summary.type || calculatorType} Configuration`,
      pipeline,
      dealstage,
      amount:
        configurationData.pricing?.totalPrice?.toString() ||
        configurationData.pricing?.basePrice?.toString() ||
        '0',
      configuration_tier:
        configurationData.summary?.tier?.toString() || '1',
      configuration_type__ar_vr_:
        configurationData.summary?.type || calculatorType,
      configuration_features: featureString,
      items_to_be_commissioned: commissionString,
      project_details:
        configurationData.summary?.projectDetails || projectDetails,
      project_link: configurationData.immersionLink || '',
      brandsource: contactDetails.brandsource || 'voyager',
      organization_id: organizationId || '',
    };

    console.log('Creating deal with properties:', dealProperties);

    // Prepare associations array
    const associations = [
      {
        to: { id: contactId, type: 'contact' },
        types: [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 3, // Contact to deal
          },
        ],
      },
    ];

    // Add salesperson association if we have one
    if (salesPersonContactId) {
      associations.push({
        to: { id: salesPersonContactId, type: 'contact' },
        types: [
          {
            associationCategory: 'HUBSPOT_DEFINED',
            associationTypeId: 3, // Contact to deal (as salesperson)
          },
        ],
      });
    }

    const deal = await hubspotClient.crm.deals.basicApi.create({
      properties: dealProperties,
      associations,
    });

    console.log('Deal created successfully:', deal);

    return NextResponse.json({
      message: 'Deal created successfully',
      dealId: deal.id,
      contactId: contactId,
      salesPersonContactId: salesPersonContactId || null,
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
