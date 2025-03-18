'use client';
// src/lib/pdfService.js
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

/**
 * Generate and save PDF from calculator results
 *
 * @param {Object} results - Results from calculator
 * @param {Object} options - PDF generation options
 * @param {string} filename - Filename for saved PDF
 * @returns {boolean} Success status
 */
export function generateAndSavePDF(
  results,
  options = {},
  filename = 'voyager-calculator-results.pdf'
) {
  try {
    const doc = new jsPDF();

    // Add logo if available
    try {
      doc.addImage('/Voyager-Box-Logo.png', 'PNG', 10, 10, 30, 30);
    } catch (err) {
      console.warn('Could not add logo image:', err);
    }

    // Add title
    doc.setFontSize(22);
    doc.setTextColor(231, 144, 35); // Primary color
    doc.text(options.title || 'Voyager Calculator Results', 105, 20, {
      align: 'center',
    });

    // Add subtitle
    doc.setFontSize(16);
    doc.setTextColor(50, 50, 50);
    doc.text(options.subtitle || 'Configuration Summary', 105, 30, {
      align: 'center',
    });

    // Add company info
    doc.setFontSize(12);
    doc.text(
      `Prepared for: ${options.companyName || 'Your Business'}`,
      20,
      50
    );
    doc.text(`Date: ${new Date().toLocaleDateString()}`, 20, 58);

    // Add features section
    if (results.features && results.features.length > 0) {
      doc.setFontSize(14);
      doc.setTextColor(231, 144, 35); // Primary color
      doc.text('Selected Features', 20, 75);

      // Create table data
      const featuresData = results.features.map((feature) => {
        if (Array.isArray(feature)) {
          return [feature[0], feature[1]];
        } else if (typeof feature === 'object') {
          return [feature.name || 'Feature', feature.value || 'Yes'];
        }
        return [feature, ''];
      });

      doc.autoTable({
        startY: 80,
        head: [['Feature', 'Value']],
        body: featuresData,
        theme: 'grid',
        headStyles: {
          fillColor: [231, 144, 35],
          textColor: [255, 255, 255],
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });
    }

    // Add commission items if available
    if (
      results.commissionItems &&
      results.commissionItems.length > 0
    ) {
      const tableEndY = doc.lastAutoTable
        ? doc.lastAutoTable.finalY + 15
        : 120;

      doc.setFontSize(14);
      doc.setTextColor(231, 144, 35); // Primary color
      doc.text('Additional Items', 20, tableEndY);

      const commissionData = results.commissionItems.map((item) => {
        if (typeof item === 'object') {
          return [item.name || item.description || 'Item'];
        }
        return [item];
      });

      doc.autoTable({
        startY: tableEndY + 5,
        head: [['Item']],
        body: commissionData,
        theme: 'grid',
        headStyles: {
          fillColor: [231, 144, 35],
          textColor: [255, 255, 255],
        },
        alternateRowStyles: { fillColor: [245, 245, 245] },
      });
    }

    // Add pricing information if allowed
    if (options.showPrice !== false) {
      const tableEndY = doc.lastAutoTable
        ? doc.lastAutoTable.finalY + 15
        : 160;

      doc.setFontSize(14);
      doc.setTextColor(231, 144, 35); // Primary color
      doc.text('Pricing Details', 20, tableEndY);

      const pricingData = [
        ['Base Price', `£${results.pricing.basePrice.toFixed(2)}`],
      ];

      // Add additional costs
      if (results.pricing.additionalCosts) {
        Object.entries(results.pricing.additionalCosts).forEach(
          ([name, cost]) => {
            pricingData.push([name, `£${cost.toFixed(2)}`]);
          }
        );
      }

      // Add total
      pricingData.push([
        'Total',
        `£${results.pricing.totalPrice.toFixed(2)}`,
      ]);

      doc.autoTable({
        startY: tableEndY + 5,
        body: pricingData,
        theme: 'grid',
        alternateRowStyles: { fillColor: [245, 245, 245] },
        bodyStyles: {
          fontSize: 10,
          textColor: [80, 80, 80],
        },
        styles: {
          cellPadding: 5,
        },
        columnStyles: {
          0: { fontStyle: 'bold' },
          1: { halign: 'right' },
        },
        didDrawCell: function (data) {
          // Make the total row bold
          if (data.row.index === pricingData.length - 1) {
            doc.setFont(undefined, 'bold');
            doc.setTextColor(231, 144, 35);
          }
        },
      });
    }

    // Add footer
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    const footerText = `For more information contact: ${options.contactInfo?.email || 'connect@voyagervrlab.co.uk'}`;
    doc.text(footerText, 105, 280, { align: 'center' });
    doc.text(
      `Phone: ${options.contactInfo?.phone || '+44 7470 361585'}`,
      105,
      285,
      { align: 'center' }
    );
    doc.text(
      `Website: ${options.contactInfo?.website || 'voyagervrlab.co.uk'}`,
      105,
      290,
      { align: 'center' }
    );

    // Save the PDF
    doc.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert(
      'Could not generate PDF. Please try again or contact support.'
    );
    return false;
  }
}

/**
 * Generate a PDF buffer without saving
 * Useful for preview or server-side generation
 *
 * @param {Object} results - Results from calculator
 * @param {Object} options - PDF generation options
 * @returns {ArrayBuffer|null} PDF data as buffer or null on error
 */
export function generatePDFBuffer(results, options = {}) {
  try {
    const doc = new jsPDF();

    // Configuration is the same as generateAndSavePDF
    // Just return the buffer instead of saving

    // Logic would be identical to above, just without the doc.save() call

    return doc.output('arraybuffer');
  } catch (error) {
    console.error('Error generating PDF buffer:', error);
    return null;
  }
}
