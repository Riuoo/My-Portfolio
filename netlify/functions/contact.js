// Netlify Function for handling contact form submissions
// This replaces the PHP contact form for Netlify deployment

exports.handler = async (event, context) => {
  // Only allow POST requests
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // Handle CORS preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }

  try {
    // Parse the form data
    const formData = JSON.parse(event.body);
    const { name, email, subject, message } = formData;

    // Basic validation
    if (!name || !email || !subject || !message) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          success: false, 
          error: 'All fields are required.' 
        })
      };
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({ 
          success: false, 
          error: 'Invalid email address.' 
        })
      };
    }

    // Sanitize inputs
    const sanitizeInput = (input) => {
      return input.replace(/[<>]/g, '').trim();
    };

    const sanitizedData = {
      name: sanitizeInput(name),
      email: sanitizeInput(email),
      subject: sanitizeInput(subject),
      message: sanitizeInput(message)
    };

    // Here you would typically send an email using a service like:
    // - SendGrid
    // - Mailgun
    // - AWS SES
    // - Or use Netlify Forms (see alternative approach below)
    
    // For now, we'll just log the data and return success
    console.log('Contact form submission:', sanitizedData);

    // You can integrate with email services here
    // Example with SendGrid (uncomment and configure):
    /*
    const sgMail = require('@sendgrid/mail');
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    
    const msg = {
      to: 'your-email@example.com', // Change to your email
      from: 'noreply@yourdomain.com', // Change to your verified sender
      subject: `[Portfolio Contact] ${sanitizedData.subject}`,
      text: `
        Name: ${sanitizedData.name}
        Email: ${sanitizedData.email}
        Subject: ${sanitizedData.subject}
        Message: ${sanitizedData.message}
      `,
      html: `
        <h3>New Contact Form Submission</h3>
        <p><strong>Name:</strong> ${sanitizedData.name}</p>
        <p><strong>Email:</strong> ${sanitizedData.email}</p>
        <p><strong>Subject:</strong> ${sanitizedData.subject}</p>
        <p><strong>Message:</strong></p>
        <p>${sanitizedData.message.replace(/\n/g, '<br>')}</p>
      `
    };
    
    await sgMail.send(msg);
    */

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Thank you for your message! I will get back to you soon.'
      })
    };

  } catch (error) {
    console.error('Error processing contact form:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify({ 
        success: false, 
        error: 'Failed to send message. Please try again later.' 
      })
    };
  }
};
