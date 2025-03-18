// src/app/components/dashboard/calculator/DealForm.js
// Updated handleSubmit function to use the new hubspotData format:

const handleSubmit = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
  setInviteStatus({ type: '', message: '' });

  try {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.email
    ) {
      throw new Error('Please fill in all required fields');
    }

    // Validate email
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!regex.test(formData.email)) {
      throw new Error('Please enter a valid email address');
    }

    // Generate an immersion link if applicable
    const partnerSlug =
      partner?.name?.toLowerCase().replace(/\s+/g, '') || 'voyager';
    const generatedLink = `https://immerse.voyagervrlab.co.uk/${partnerSlug}/${Date.now()}`;

    // Add immersion link to configuration data
    const updatedConfigData = {
      ...configurationData,
      immersionLink: generatedLink,
      summary: {
        ...configurationData.summary,
        projectDetails:
          formData.projectDetails ||
          configurationData.summary?.projectDetails ||
          '',
      },
    };

    // Use the hubspotData from configuration if available, or build it from form data
    const hubspotData = configurationData.hubspotData || {
      dealname: `${formData.firstName} ${formData.lastName} - ${configurationData.summary.type} Configuration`,
      pipeline: 'default',
      dealstage: 'appointmentscheduled',
      amount: configurationData.pricing.totalPrice.toString(),
      configuration_tier: configurationData.summary.tier.toString(),
      configuration_type__ar_vr_:
        configurationData.summary.configurationType || 'New Target',
      configuration_features: configurationData.features.join('\n'),
      items_to_be_commissioned:
        configurationData.commissionItems.join('\n'),
      project_details:
        formData.projectDetails ||
        configurationData.summary.projectDetails ||
        '',
      project_link: generatedLink,
      brandsource: formData.brandsource,
    };

    // Create the request body with proper hubspot field structure
    const requestBody = {
      contactDetails: {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phoneNumber: formData.phoneNumber || '',
        companyName: formData.companyName || '',
        sourceInfo: formData.sourceInfo || '',
        projectDetails: formData.projectDetails || '',
        brandsource: formData.brandsource,
      },
      configurationData: updatedConfigData,
      hubspotData: {
        dealname: `${formData.firstName} ${formData.lastName} - ${configurationData.summary.type} Configuration`,
        pipeline: 'default',
        dealstage: 'appointmentscheduled',
        amount: configurationData.pricing.totalPrice.toString(),
        configuration_tier: configurationData.summary.tier.toString(),
        configuration_type__ar_vr_:
          configurationData.summary.configurationType || 'New Target',
        configuration_features: configurationData.features.join('\n'),
        items_to_be_commissioned:
          configurationData.commissionItems.join('\n'),
        project_details:
          formData.projectDetails ||
          configurationData.summary.projectDetails ||
          '',
        project_link: generatedLink,
        brandsource: formData.brandsource,
      },
      calculatorType,
    };

    // Submit to our API endpoint
    const response = await fetch('/api/hubspot/deal', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error || 'Failed to submit to Hubspot'
      );
    }

    const data = await response.json();
    console.log('HubSpot response:', data);

    // Show success message
    setImmersionLink(generatedLink);
    setSuccess(true);
  } catch (err) {
    console.error('Error submitting to Hubspot:', err);
    setError(
      err.message || 'An error occurred while submitting the form.'
    );
  } finally {
    setIsSubmitting(false);
  }
};
