// Netlify function to handle form submissions and send emails
const sgMail = require('@sendgrid/mail');

// Set SendGrid API key from environment variable
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.handler = async (event, context) => {
  console.log('Form submission received:', event.body);
  
  try {
    const submission = JSON.parse(event.body);
    const formName = submission.form_name || 'contact-form';
    const data = submission.data || submission;
    
    let emailHtml = '';
    let emailText = '';
    let subject = '';
    let recipientEmail = 'tuncaycicek@outlook.com';
    
    const currentDate = new Date().toLocaleString('de-DE', {
      timeZone: 'Europe/Zurich',
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });

    // Determine if it's a booking form or contact form
    const isBookingForm = data.firstName && data.lastName;
    
    if (isBookingForm) {
      subject = `🚕 Neue Taxi-Buchung von ${data.firstName} ${data.lastName}`;
      
      emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FDE046 0%, #facc15 100%); color: #000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #1f2937; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #FDE046; padding-bottom: 5px; }
        .info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 15px; }
        .info-item { background: #f9fafb; padding: 12px; border-radius: 6px; border-left: 4px solid #FDE046; }
        .info-label { font-weight: bold; color: #374151; margin-bottom: 5px; }
        .info-value { color: #1f2937; }
        .trip-details { background: #fef3c7; padding: 20px; border-radius: 8px; border: 1px solid #fbbf24; }
        .footer { background: #1f2937; color: #fff; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; }
        .urgent { background: #fee2e2; border-left-color: #ef4444; }
        .phone-link { color: #059669; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚕 Neue Taxi-Buchungsanfrage</h1>
            <p>UmutTaxi - Premium Service</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>👤 Kundendaten</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">Name</div>
                        <div class="info-value">${data.firstName} ${data.lastName}</div>
                    </div>
                    <div class="info-item ${!data.phone ? 'urgent' : ''}">
                        <div class="info-label">Telefon</div>
                        <div class="info-value">
                            ${data.phone ? `<a href="tel:${data.phone}" class="phone-link">${data.phone}</a>` : 'Nicht angegeben'}
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">E-Mail</div>
                        <div class="info-value">${data.email || 'Nicht angegeben'}</div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h3>🚗 Fahrtdetails</h3>
                <div class="trip-details">
                    <div class="info-grid">
                        <div class="info-item">
                            <div class="info-label">📍 Abholadresse</div>
                            <div class="info-value">${data.pickup || 'Nicht angegeben'}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">🎯 Zieladresse</div>
                            <div class="info-value">${data.destination || 'Nicht angegeben'}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">📅 Datum</div>
                            <div class="info-value">${data.date || 'Nicht angegeben'}</div>
                        </div>
                        <div class="info-item">
                            <div class="info-label">⏰ Uhrzeit</div>
                            <div class="info-value">${data.time || 'Nicht angegeben'}</div>
                        </div>
                    </div>
                    
                    ${data.service ? `
                    <div class="info-item" style="margin-top: 15px;">
                        <div class="info-label">🚕 Gewünschter Service</div>
                        <div class="info-value">${data.service}</div>
                    </div>
                    ` : ''}
                    
                    ${data.notes ? `
                    <div class="info-item" style="margin-top: 15px;">
                        <div class="info-label">📝 Zusätzliche Informationen</div>
                        <div class="info-value">${data.notes}</div>
                    </div>
                    ` : ''}
                </div>
            </div>

            <div class="section">
                <h3>📊 Buchungsdetails</h3>
                <div class="info-item">
                    <div class="info-label">Eingereicht am</div>
                    <div class="info-value">${currentDate}</div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>UmutTaxi</strong> - Ihr zuverlässiger Partner für Transportdienstleistungen</p>
            <p>📞 +41 76 560 95 28 | ✉️ adem.polat03@hotmail.com</p>
        </div>
    </div>
</body>
</html>`;

      emailText = `
🚕 NEUE TAXI-BUCHUNGSANFRAGE
================================

👤 KUNDENDATEN:
Name: ${data.firstName} ${data.lastName}
Telefon: ${data.phone || 'Nicht angegeben'}
E-Mail: ${data.email || 'Nicht angegeben'}

🚗 FAHRTDETAILS:
Von: ${data.pickup || 'Nicht angegeben'}
Nach: ${data.destination || 'Nicht angegeben'}
Datum: ${data.date || 'Nicht angegeben'}
Uhrzeit: ${data.time || 'Nicht angegeben'}
Service: ${data.service || 'Nicht spezifiziert'}
Notizen: ${data.notes || 'Keine'}

📊 BUCHUNGSDETAILS:
Eingereicht am: ${currentDate}

UmutTaxi - Premium Service
📞 +41 76 560 95 28
`;
    } else {
      // Contact form
      subject = `📞 Neue Kontaktanfrage von ${data.name || 'Unbekannt'}`;
      
      emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #FDE046 0%, #facc15 100%); color: #000; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .section { margin-bottom: 25px; }
        .section h3 { color: #1f2937; margin-bottom: 15px; font-size: 18px; border-bottom: 2px solid #FDE046; padding-bottom: 5px; }
        .info-item { background: #f9fafb; padding: 12px; border-radius: 6px; border-left: 4px solid #FDE046; margin-bottom: 10px; }
        .info-label { font-weight: bold; color: #374151; margin-bottom: 5px; }
        .info-value { color: #1f2937; }
        .footer { background: #1f2937; color: #fff; padding: 15px; text-align: center; border-radius: 0 0 8px 8px; font-size: 14px; }
        .phone-link { color: #059669; text-decoration: none; font-weight: bold; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>📞 Neue Kontaktanfrage</h1>
            <p>UmutTaxi - Premium Service</p>
        </div>
        
        <div class="content">
            <div class="section">
                <h3>👤 Kontaktdaten</h3>
                <div class="info-item">
                    <div class="info-label">Name</div>
                    <div class="info-value">${data.name || 'Nicht angegeben'}</div>
                </div>
                <div class="info-item">
                    <div class="info-label">Telefon</div>
                    <div class="info-value">
                        ${data.phone ? `<a href="tel:${data.phone}" class="phone-link">${data.phone}</a>` : 'Nicht angegeben'}
                    </div>
                </div>
                <div class="info-item">
                    <div class="info-label">E-Mail</div>
                    <div class="info-value">${data.email || 'Nicht angegeben'}</div>
                </div>
            </div>

            ${data.pickup || data.destination ? `
            <div class="section">
                <h3>🚗 Fahrtdetails</h3>
                ${data.pickup ? `
                <div class="info-item">
                    <div class="info-label">📍 Abholadresse</div>
                    <div class="info-value">${data.pickup}</div>
                </div>
                ` : ''}
                ${data.destination ? `
                <div class="info-item">
                    <div class="info-label">🎯 Zieladresse</div>
                    <div class="info-value">${data.destination}</div>
                </div>
                ` : ''}
                ${data.datetime ? `
                <div class="info-item">
                    <div class="info-label">📅 Datum/Uhrzeit</div>
                    <div class="info-value">${data.datetime}</div>
                </div>
                ` : ''}
                ${data.service ? `
                <div class="info-item">
                    <div class="info-label">🚕 Service</div>
                    <div class="info-value">${data.service}</div>
                </div>
                ` : ''}
            </div>
            ` : ''}

            ${data.message ? `
            <div class="section">
                <h3>💬 Nachricht</h3>
                <div class="info-item">
                    <div class="info-value">${data.message}</div>
                </div>
            </div>
            ` : ''}

            <div class="section">
                <h3>📊 Anfrage-Details</h3>
                <div class="info-item">
                    <div class="info-label">Eingereicht am</div>
                    <div class="info-value">${currentDate}</div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>UmutTaxi</strong> - Ihr zuverlässiger Partner für Transportdienstleistungen</p>
            <p>📞 +41 76 560 95 28 | ✉️ adem.polat03@hotmail.com</p>
        </div>
    </div>
</body>
</html>`;

      emailText = `
📞 NEUE KONTAKTANFRAGE
=====================

👤 KONTAKTDATEN:
Name: ${data.name || 'Nicht angegeben'}
Telefon: ${data.phone || 'Nicht angegeben'}
E-Mail: ${data.email || 'Nicht angegeben'}

🚗 FAHRTDETAILS:
Von: ${data.pickup || 'Nicht angegeben'}
Nach: ${data.destination || 'Nicht angegeben'}
Datum/Uhrzeit: ${data.datetime || 'Nicht angegeben'}
Service: ${data.service || 'Nicht spezifiziert'}

💬 NACHRICHT:
${data.message || 'Keine Nachricht'}

📊 ANFRAGE-DETAILS:
Eingereicht am: ${currentDate}

UmutTaxi - Premium Service
📞 +41 76 560 95 28
`;
    }

    console.log('Form details:', emailText);

    // Send email using SendGrid
    const msg = {
      to: 'tuncaycicek@outlook.com',
      cc: ['tuncaycicek@outlook.com'],
      from: process.env.SENDGRID_FROM_EMAIL || 'noreply@umuttaxi.ch',
      subject: subject,
      text: emailText,
      html: emailHtml
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent successfully');
      
      return {
        statusCode: 200,
        body: JSON.stringify({ 
          message: 'Form submission processed and email sent successfully',
          subject: subject,
          details: emailText
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
          subject: subject
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
