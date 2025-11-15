import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

export const generateInvoicePDF = async (elementRef, clientName) => {
  try {
    const input = elementRef.current;
    
    // Ensure A4 dimensions
    const pdf = new jsPDF('p', 'mm', 'a4');
    const pageWidth = pdf.internal.pageSize.getWidth();

    // Set canvas to exact A4 size
    const canvas = await html2canvas(input, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: input.scrollWidth,
      height: input.scrollHeight,
      windowWidth: input.scrollWidth,
      windowHeight: input.scrollHeight
    });

    const imgData = canvas.toDataURL('image/png', 1.0);
    
    // Calculate image dimensions to fit A4 exactly
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    // Add image to PDF
    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);

    // Generate file name
    const fileName = `Dharmar_Mahal_Invoice_${clientName.replace(/\s+/g, '_')}.pdf`;
    
    // Save the PDF
    pdf.save(fileName);
    
    return true;
  } catch (error) {
    console.error('Error generating PDF:', error);
    throw new Error('Failed to generate PDF');
  }
};

export const numberToWords = (num) => {
  if (num === 0) return 'zero only';
  
  const ones = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teens = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tens = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
  
  let words = '';
  let number = num;

  // Handle lakhs
  if (number >= 100000) {
    const lakhs = Math.floor(number / 100000);
    if (lakhs > 0) {
      words += numberToWords(lakhs) + ' lakh ';
      number %= 100000;
    }
  }

  // Handle thousands
  if (number >= 1000) {
    const thousands = Math.floor(number / 1000);
    if (thousands > 0) {
      if (thousands >= 100) {
        words += numberToWords(thousands) + ' ';
      } else {
        words += convertHundreds(thousands) + ' ';
      }
      words += 'thousand ';
      number %= 1000;
    }
  }

  // Handle hundreds and below
  words += convertHundreds(number);
  
  return words.trim() + ' only';

  function convertHundreds(n) {
    let result = '';
    
    // Hundreds
    if (n >= 100) {
      result += ones[Math.floor(n / 100)] + ' hundred ';
      n %= 100;
    }
    
    // Tens and ones
    if (n >= 20) {
      result += tens[Math.floor(n / 10)] + ' ';
      n %= 10;
    } else if (n >= 10) {
      result += teens[n - 10] + ' ';
      n = 0;
    }
    
    // Ones
    if (n > 0) {
      result += ones[n] + ' ';
    }
    
    return result;
  }
};