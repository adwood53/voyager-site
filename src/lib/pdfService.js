// src/utils/pdfService.js

import jsPDF from 'jspdf';
import 'jspdf-autotable';

/**
 * PDF Service
 *
 * This utility provides functions for generating PDF documents
 * based on calculator results.
 */

/**
 * Generate a PDF document from calculator results
 *
 * @param {Object} results - Results from calculator
 * @param {Object} options - PDF generation options
 * @returns {jsPDF} PDF document object
 */
export function generatePDF(results, options = {}) {
  const {
    title = 'Voyager Calculator Results',
    subtitle = 'Summary',
    logoUrl = '/logo.png',
    companyName = 'Voyager',
    showPrice = true,
    includeRecommendations = true,
    customSections = [],
    contactInfo = {},
  } = options;

  // Create new PDF document
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'pt',
    format: 'a4',
  });

  // Page dimensions
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const margin = 40;
  const contentWidth = pageWidth - margin * 2;

  // Brand colors
  const primaryColor = [231, 144, 35]; // Voyager orange [R, G, B]
  const secondaryColor = [166, 98, 12]; // Voyager dark orange

  // Add header with background
  doc.setFillColor(0, 0, 0);
  doc.rect(0, 0, pageWidth, 100, 'F');

  let currentY = 60;

  // Add logo if available
  if (logoUrl) {
    try {
      // We'll try to add logo, but continue if it fails
      addLogo(doc, logoUrl, pageWidth - 160, 20, 120, 60).catch(
        () => {
          console.warn('Failed to add logo to PDF');
        }
      );
    } catch (error) {
      console.warn('Error adding logo to PDF:', error);
    }
  }

  // Add title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text(title, margin, currentY);

  // Add subtitle if provided
  if (subtitle) {
    currentY += 25;
    doc.setFontSize(14);
    doc.text(subtitle, margin, currentY);
  }

  // Reset to black text color for content
  doc.setTextColor(0, 0, 0);
  currentY = 140; // Start content below header

  // Add features table
  if (results.features && results.features.length > 0) {
    const featureRows = results.features.map((feature) => {
      if (Array.isArray(feature)) {
        return feature;
      } else if (typeof feature === 'object') {
        return [feature.name || 'Feature', feature.value || 'Yes'];
      } else {
        return [feature, 'Yes'];
      }
    });

    doc.autoTable({
      startY: currentY,
      head: [['Feature', 'Details']],
      body: featureRows,
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: 'bold',
      },
      styles: { fontSize: 11, cellPadding: 5 },
      margin: { left: margin, right: margin },
      theme: 'grid',
    });

    currentY = doc.lastAutoTable.finalY + 30;
  }

  // Add commission items table
  if (results.commissionItems && results.commissionItems.length > 0) {
    const commissionRows = results.commissionItems.map((item) => {
      return [
        typeof item === 'object'
          ? item.name || item.description
          : item,
      ];
    });

    doc.autoTable({
      startY: currentY,
      head: [['Items to be Commissioned']],
      body: commissionRows,
      headStyles: {
        fillColor: primaryColor,
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: 'bold',
      },
      styles: { fontSize: 11, cellPadding: 5 },
      margin: { left: margin, right: margin },
      theme: 'grid',
    });

    currentY = doc.lastAutoTable.finalY + 30;
  }

  // Add pricing information
  if (results.pricing && showPrice) {
    // Tier and base price
    if (results.summary && results.summary.tier) {
      doc.setFontSize(24);
      doc.setFont(undefined, 'bold');
      doc.text(`Tier ${results.summary.tier}`, margin, currentY);
      currentY += 30;
    }

    doc.setFontSize(18);
    doc.setFont(undefined, 'normal');

    // Base price
    if (typeof results.pricing.basePrice === 'number') {
      doc.text(
        `Starting at: £${results.pricing.basePrice.toFixed(2)}`,
        margin,
        currentY
      );
      currentY += 30;
    }

    // Additional costs
    if (results.pricing.additionalCosts) {
      doc.setFontSize(12);
      for (const [name, cost] of Object.entries(
        results.pricing.additionalCosts
      )) {
        if (typeof cost === 'number') {
          doc.text(`${name}: £${cost.toFixed(2)}`, margin, currentY);
          currentY += 20;
        }
      }
    }

    // Total price
    if (typeof results.pricing.totalPrice === 'number') {
      currentY += 10;
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text(
        `Total: £${results.pricing.totalPrice.toFixed(2)}`,
        margin,
        currentY
      );
      currentY += 40;
    }
  }

  // Add recommendations if available
  if (
    includeRecommendations &&
    results.recommendations &&
    results.recommendations.length > 0
  ) {
    doc.setFontSize(18);
    doc.setFont(undefined, 'bold');
    doc.text('Recommendations', margin, currentY);
    currentY += 30;

    doc.setFontSize(12);
    doc.setFont(undefined, 'normal');

    const recommendationRows = results.recommendations.map((item) => {
      if (typeof item === 'object') {
        return [
          item.title || 'Recommendation',
          item.description || '',
        ];
      } else {
        return [item, ''];
      }
    });

    doc.autoTable({
      startY: currentY,
      head: [['Recommendation', 'Description']],
      body: recommendationRows,
      headStyles: {
        fillColor: secondaryColor,
        textColor: [255, 255, 255],
        fontSize: 12,
        fontStyle: 'bold',
      },
      styles: { fontSize: 11, cellPadding: 5 },
      margin: { left: margin, right: margin },
      theme: 'grid',
    });

    currentY = doc.lastAutoTable.finalY + 30;
  }

  // Add custom sections
  for (const section of customSections) {
    if (currentY > pageHeight - 100) {
      doc.addPage();
      currentY = 60;
    }

    if (section.title) {
      doc.setFontSize(16);
      doc.setFont(undefined, 'bold');
      doc.text(section.title, margin, currentY);
      currentY += 25;
    }

    if (section.content) {
      doc.setFontSize(11);
      doc.setFont(undefined, 'normal');

      if (typeof section.content === 'string') {
        const textLines = doc.splitTextToSize(
          section.content,
          contentWidth
        );
        doc.text(textLines, margin, currentY);
        currentY += textLines.length * 15 + 20;
      } else if (Array.isArray(section.content)) {
        // Table content
        doc.autoTable({
          startY: currentY,
          head: section.headers ? [section.headers] : undefined,
          body: section.content,
          styles: { fontSize: 11, cellPadding: 5 },
          margin: { left: margin, right: margin },
          theme: 'grid',
        });

        currentY = doc.lastAutoTable.finalY + 30;
      }
    }
  }

  // Add footer with contact and company info
  addFooter(doc, {
    companyName,
    contactInfo,
    pageWidth,
    margin,
  });

  return doc;
}

/**
 * Save PDF to file with specified filename
 *
 * @param {jsPDF} doc - PDF document
 * @param {string} filename - Filename for saved PDF
 */
export function savePDF(
  doc,
  filename = 'voyager-calculator-results.pdf'
) {
  doc.save(filename);
}

/**
 * Add logo to PDF document
 *
 * @param {jsPDF} doc - PDF document
 * @param {string} logoUrl - URL of logo image
 * @param {number} x - X position
 * @param {number} y - Y position
 * @param {number} width - Width of logo
 * @param {number} height - Height of logo
 * @returns {Promise} Promise resolving when logo is added
 */
async function addLogo(doc, logoUrl, x, y, width, height) {
  return new Promise((resolve, reject) => {
    try {
      // In client-side environment
      if (typeof window !== 'undefined') {
        const img = new Image();
        img.crossOrigin = 'Anonymous';

        img.onload = () => {
          try {
            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');

            if (!ctx) {
              reject(new Error('Failed to get canvas context'));
              return;
            }

            // Draw image to canvas
            ctx.drawImage(img, 0, 0, width, height);

            // Get data URL
            const dataUrl = canvas.toDataURL('image/png');

            // Add to PDF
            doc.addImage(dataUrl, 'PNG', x, y, width, height);
            resolve();
          } catch (err) {
            reject(err);
          }
        };

        img.onerror = (err) => {
          reject(new Error(`Failed to load image: ${err}`));
        };

        img.src = logoUrl;
      } else {
        // Non-browser environment, skip logo
        resolve();
      }
    } catch (err) {
      reject(err);
    }
  });
}

/**
 * Add footer to PDF document
 *
 * @param {jsPDF} doc - PDF document
 * @param {Object} options - Footer options
 */
function addFooter(doc, options) {
  const {
    companyName = 'Voyager',
    contactInfo = {},
    pageWidth,
    margin = 40,
  } = options;

  const pageCount = doc.getNumberOfPages();

  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);

    // Add footer line
    const footerY = doc.internal.pageSize.getHeight() - 50;
    doc.setLineWidth(0.5);
    doc.setDrawColor(200, 200, 200);
    doc.line(margin, footerY, pageWidth - margin, footerY);

    // Add company name
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text(companyName, margin, footerY + 15);

    // Add contact info if available
    let contactText = '';
    if (contactInfo.email) {
      contactText += `Email: ${contactInfo.email} `;
    }
    if (contactInfo.phone) {
      contactText += `Phone: ${contactInfo.phone} `;
    }
    if (contactInfo.website) {
      contactText += `Web: ${contactInfo.website}`;
    }

    if (contactText) {
      doc.text(contactText, margin, footerY + 30);
    }

    // Add page number
    doc.text(
      `Page ${i} of ${pageCount}`,
      pageWidth - margin - 50,
      footerY + 15
    );
  }
}

/**
 * Generate and save PDF from calculator results
 *
 * @param {Object} results - Results from calculator
 * @param {Object} options - PDF generation options
 * @param {string} filename - Filename for saved PDF
 */
export function generateAndSavePDF(
  results,
  options = {},
  filename = 'voyager-calculator-results.pdf'
) {
  const doc = generatePDF(results, options);
  savePDF(doc, filename);
}
