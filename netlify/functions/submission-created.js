// Netlify function to handle form submissions and send emails
const sgMail = require('@sendgrid/mail');

// Set SendGrid API key from environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  console.log('Form submission received:', event.body);
  
  try {
    const submission = JSON.parse(event.body);
    const formName = submission.form_name;
    const data = submission.data;
    
    let emailContent = '';
    let subject = '';
    let recipientEmail = '';
    
    if (formName === 'taxi-booking') {
      subject = 'Neue Taxi-Buchungsanfrage von ' + (data.firstName + ' ' + data.lastName);
      recipientEmail = 'adem.polat03@hotmail.com';
      emailContent = `
Neue Taxi-Buchungsanfrage:

Kundendaten:
- Name: ${data.firstName} ${data.lastName}
- Telefon: ${data.phone}
- Email: ${data.email || 'Nicht angegeben'}

Fahrtdetails:
- Von: ${data.pickup}
- Nach: ${data.destination}
- Datum: ${data.date}
- Uhrzeit: ${data.time}
- Service: ${data.service || 'Nicht spezifiziert'}
- Zusätzliche Informationen: ${data.notes || 'Keine'}

Eingereicht am: ${new Date().toLocaleString('de-DE', {
  timeZone: 'Europe/Zurich'
})}
`;
    } else if (formName === 'contact-form') {
      subject = 'Neue Kontaktanfrage von ' + data.name;
      recipientEmail = 'adem.polat03@hotmail.com';
      emailContent = `
Neue Kontaktanfrage:

Kundendaten:
- Name: ${data.name}
- Telefon: ${data.phone}
- Email: ${data.email || 'Nicht angegeben'}

Fahrtdetails:
- Von: ${data.pickup}
- Nach: ${data.destination}
- Datum/Uhrzeit: ${data.datetime}
- Service: ${data.service || 'Nicht spezifiziert'}
- Nachricht: ${data.message || 'Keine'}

Eingereicht am: ${new Date().toLocaleString('de-DE', {
  timeZone: 'Europe/Zurich'
})}
`;
    } else {
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Unknown form type' })
      };
    }

    console.log('Form details:', emailContent);

    // Send email using SendGrid
    const msg = {
      to: recipientEmail,
      cc: ['tuncaycicek@outlook.com'],
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@umuttaxi.ch',
      subject: subject,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>')
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
      
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          message: 'Form submission processed and email sent successfully',
          subject: subject,
          details: emailContent
        })
      };
    } catch (emailError) {
      console.error('Error sending email:', emailError);
      
      // Fallback: return success but log email error
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          message: 'Form submission processed but email failed to send',
          error: emailError.message,
          subject: subject,
          details: emailContent
        })
      };
    }
    
  } catch (error) {
    console.error('Error processing submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        message: 'Error processing form submission',
        error: error.message 
      })
    };
  }
};
