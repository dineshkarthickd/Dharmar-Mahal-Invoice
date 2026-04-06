import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import InvoicePreview from './InvoicePreview';
import { numberToWords } from '../utils/pdfGenerator';
import '../styles/Invoice.css';

const InvoiceForm = () => {
  const [invoiceData, setInvoiceData] = useState({
    clientName: '',
    organization: '',
    location: '',
    date: new Date().toISOString().split('T')[0], // Default to today's date for picker
  });

  const [services, setServices] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [amountInWords, setAmountInWords] = useState('');

  useEffect(() => {
    const calculateTotal = () => {
      return services.reduce((total, service) => {
        return total + (parseInt(service.amount) || 0);
      }, 0);
    };

    const capitalizeWords = (str) => {
      return str.replace(/\b\w/g, l => l.toUpperCase());
    };

    const total = calculateTotal();
    setTotalAmount(total);
    setAmountInWords(capitalizeWords(numberToWords(total)));
  }, [services]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleServiceChange = (index, field, value) => {
    const updatedServices = services.map((service, i) => 
      i === index ? { ...service, [field]: value } : service
    );
    setServices(updatedServices);
  };

  const addServiceField = () => {
    setServices(prev => [
      ...prev,
      { description: '', amount: '' }
    ]);
  };

  const removeServiceField = (index) => {
    setServices(prev => prev.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setInvoiceData({
      clientName: '',
      organization: '',
      location: '',
      date: new Date().toISOString().split('T')[0],
    });
    setServices([]);
  };

  return (
    <motion.div 
      className="invoice-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="invoice-header">
        <h1>DHARMAR MAHAL INVOICE GENERATOR</h1>
        <motion.button 
          onClick={resetForm} 
          className="reset-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          RESET FORM
        </motion.button>
      </div>

      <div className="invoice-content">
        <motion.div 
          className="form-section"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2>📝 Enter Invoice Details</h2>
          
          <div className="form-group">
            <label>📅 Select Date:</label>
            <input
              type="date"
              name="date"
              value={invoiceData.date}
              onChange={handleInputChange}
            />
          </div>
          
          <div className="form-group">
            <label>👤 Client Name:</label>
            <input
              type="text"
              name="clientName"
              value={invoiceData.clientName}
              onChange={handleInputChange}
              placeholder="e.g., Mr.G.Ravi Varman"
            />
          </div>

          <div className="form-group">
            <label>🏢 Organization:</label>
            <input
              type="text"
              name="organization"
              value={invoiceData.organization}
              onChange={handleInputChange}
              placeholder="e.g., Karpagam Academy of Higher Education"
            />
          </div>

          <div className="form-group">
            <label>📍 Location:</label>
            <input
              type="text"
              name="location"
              value={invoiceData.location}
              onChange={handleInputChange}
              placeholder="e.g., Coimbatore"
            />
          </div>

          <div className="services-section">
            <div className="services-header">
              <h3>💼 Services & Charges</h3>
              <motion.button 
                onClick={addServiceField}
                className="add-service-btn"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                ADD FIELD
              </motion.button>
            </div>

            <AnimatePresence>
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  className="service-field"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="service-inputs">
                    <div className="service-description">
                      <input
                        type="text"
                        placeholder="Service Description (e.g., Hall Rent, EB & Generator, etc.)"
                        value={service.description}
                        onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                      />
                    </div>
                    <div className="service-amount">
                      <input
                        type="number"
                        placeholder="Amount (₹)"
                        value={service.amount}
                        onChange={(e) => handleServiceChange(index, 'amount', e.target.value)}
                        min="0"
                      />
                    </div>
                    <motion.button
                      className="remove-service-btn"
                      onClick={() => removeServiceField(index)}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      X
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {services.length === 0 && (
              <div className="no-services">
                <p>No services added yet. Click "ADD FIELD" to add services.</p>
              </div>
            )}
          </div>

          <div className="total-section">
            <h3>💰 Total Amount: ₹{totalAmount.toLocaleString()}</h3>
            <p className="amount-words">{amountInWords}</p>
          </div>
        </motion.div>

        <motion.div 
          className="preview-section"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <InvoicePreview 
            invoiceData={invoiceData} 
            services={services}
            totalAmount={totalAmount}
            amountInWords={amountInWords}
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default InvoiceForm;