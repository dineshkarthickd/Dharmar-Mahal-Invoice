import React, { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { generateInvoicePDF } from '../utils/pdfGenerator';
import '../styles/Invoice.css';

const InvoicePreview = ({ invoiceData, services, totalAmount, amountInWords }) => {
  const invoiceRef = useRef();
  const [isGenerating, setIsGenerating] = useState(false);

  // Image paths from public/images folder
  const headerImage = '/images/Header.jpg';
  const footerImage = '/images/Footer.jpg';
  const signatureImage = '/images/Signature.jpg';

  const handleGeneratePDF = async () => {
    if (!invoiceData.clientName) {
      alert('Please enter client name before generating PDF');
      return;
    }

    setIsGenerating(true);
    
    try {
      await generateInvoicePDF(invoiceRef, invoiceData.clientName, invoiceData.date);
    } catch (error) {
      console.error('PDF generation failed:', error);
      alert('Failed to generate PDF. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="preview-container">
      <div className="preview-scaler">
        <div className="a4-page" ref={invoiceRef}>
        <div className="invoice-top-section">
          {/* Header with Image - Stretched to full width */}
          <div className="invoice-header-preview">
            <img 
              src={headerImage} 
              alt="Dharmar Mahal Header" 
              className="header-image"
              onError={(e) => {
                console.log('Header image failed to load');
                e.target.style.display = 'none';
              }}
            />
          </div>

          {/* Date - Right aligned */}
          <div className="date-section">
            <p><strong>DATE:</strong> {invoiceData.date}</p>
          </div>

          {/* Client Details - Compact */}
          <div className="client-section">
            <p><strong>To :</strong></p>
            <p>{invoiceData.clientName || 'Name'}</p>
            {invoiceData.organization && <p>{invoiceData.organization}</p>}
            {invoiceData.location && <p>{invoiceData.location}</p>}
          </div>
        </div>

        {/* Main Content Area - This will expand to push footer down */}
        <div className="main-content">
          {/* Services - Compact layout */}
          {services.length > 0 && (
            <div className="services-preview">
              <table>
                <tbody>
                  {services.map((service, index) => (
                    <tr key={index}>
                      <td>{service.description || 'Service Description'}:</td>
                      <td>₹{(parseInt(service.amount) || 0).toLocaleString()}</td>
                    </tr>
                  ))}
                  <tr className="total-row">
                    <td><strong>Total Amount:</strong></td>
                    <td><strong>₹{totalAmount.toLocaleString()}</strong></td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Bottom Section - Anchored to the end of A4 page */}
        <div className="invoice-bottom-section">
          {services.length > 0 && (
            <>
              {/* Amount in Words - Below Services */}
              <div className="amount-words-section">
                <p><strong>Recieved Total Amount Rupees {amountInWords}</strong></p>
              </div>

              {/* Signature with Image - Immediately below amount in words */}
              <div className="signature-section">
                <img 
                  src={signatureImage} 
                  alt="Manager Signature" 
                  className="signature-image"
                  onError={(e) => {
                    console.log('Signature image failed to load');
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            </>
          )}

          {/* Footer with Image - Always at the bottom */}
          <div className="footer-section">
            <img 
              src={footerImage} 
              alt="Dharmar Mahal Footer" 
              className="footer-image"
              onError={(e) => {
                console.log('Footer image failed to load');
                e.target.style.display = 'none';
              }}
            />
            <p className="dev-credit-pdf">Designed & Developed by Dinesh Karthick Durgadas</p>
          </div>
        </div>
        </div>
      </div>

      <motion.button 
        onClick={handleGeneratePDF} 
        className="generate-pdf-btn"
        disabled={isGenerating}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isGenerating ? (
          <div className="btn-loading">
            <div className="btn-spinner"></div>
            AUTHENTICATING...
          </div>
        ) : (
          'GENERATE PDF'
        )}
      </motion.button>
    </div>
  );
};

export default InvoicePreview;