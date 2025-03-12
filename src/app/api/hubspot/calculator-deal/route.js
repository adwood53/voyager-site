// src/app/api/hubspot/calculator-deal/route.js
import { NextResponse } from 'next/server';
import { Client } from '@hubspot/api-client';

export const POST = async (req) => {
  try {
    const hubspotClient = new Client({
      accessToken: process.env.HUBSPOT_API_KEY,
    });

    const body = await req.json();
    const { 
      calculatorType, 
      contactDetails, 
      salesPersonDetails, 
      configurationData 
    } = body;

    // ----------------------------------------
    // 1. Create or find the client contact
    // ----------------------------------------
    let clientContactId = await createOrFindContact(
      hubspotClient, 
      contactDetails
    );
    
    // ----------------------------------------
    // 2. Create or find the salesperson contact (if provided)
    // ----------------------------------------
    let salesPersonContactId = null;
    if (salesPersonDetails && salesPersonDetails.email) {
      salesPersonContactId = await createOrFindContact(
        hubspotClient, 
        salesPersonDetails
      );
    }

    // ----------------------------------------
    // 3. Prepare deal properties
    // ----------------------------------------
    // Convert features and commission items to strings
    const featureString = configurationData.features
      .map(([k, v]) => `${k}: ${v}`)
      .join('\n');

    const commissionString = 
      configurationData.commissionItems.join('\n') || 'None';

    const projectDetails = contactDetails.projectDetails || '';

    // Prepare deal properties object
    const dealProperties = {
      dealname: `${contactDetails.firstName} ${contactDetails.lastName} - ${calculatorType.charAt(0).toUpperCase() + calculatorType.slice(1)} Configuration`,
      pipeline: 'default',
      dealstage: 'appointmentscheduled',
      amount: configurationData.pricing.totalPrice.toString(),
      calculator_type: calculatorType,
      configuration_features: featureString,
      items_to_be_commissioned: commissionString,
      project_details: configurationData.summary.projectDetails || projectDetails,
      project_link: configurationData.immersionLink || '',
      brandsource: contactDetails.brandsource,
    };

    // ----------------------------------------
    // 4. Create associations array for the deal
    // ----------------------------------------
    const associations = [
      {
        to: { id: clientContactId, type: 'contact' },
        types: [