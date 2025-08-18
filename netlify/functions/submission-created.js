// Netlify function to handle form submissions
exports.handler = async (event, context) => {
  console.log('Form submission received:', event.body);
  
  try {
    const submission = JSON.parse(event.body);
    const formName = submission.form_name;
    const data = submission.data;
    
    let emailContent = '';
    let subject = '';
    
    if (formName === 'taxi-booking') {
      subject = 'Neue Taxi-Buchungsanfrage von ' + (data.firstName + ' ' + data.lastName);
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

    // Here you could integrate with an email service like SendGrid, Mailgun, etc.
    // For now, we just log the submission
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        message: 'Form submission processed successfully',
        subject: subject,
        details: emailContent
      })
    };
    
  } catch (error) {
    console.error('Error processing form submission:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Failed to process form submission' })
    };
  }
};
