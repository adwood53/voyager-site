// src/app/api/hubspot/calculator-deal/route.js

import { NextResponse } from 'next/server';

export const POST = async (req) => {
  try {
    const body = await req.json();
    const {
      contactDetails,
      configurationData,
      calculatorType = 'generic',
      salesPersonId,
      organizationId,
    } = body;

    // Log the received data
    console.log('Received data:', {
      contactDetails,
      configurationData,
      calculatorType,
      salesPersonId,
      organizationId,
    });

    // In a real implementation, we would send this to HubSpot
    // For now, we're just logging and returning a mock response

    return NextResponse.json({
      message:
        'Deal creation simulated (HubSpot integration pending)',
      dealId: `mock-${Date.now()}`,
      contactId: `contact-${Date.now()}`,
      salesPersonContactId: salesPersonId
        ? `sales-${salesPersonId}`
        : null,
    });
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      {
        error: error.message,
        details: error.toString(),
      },
      { status: 500 }
    );
  }
};
