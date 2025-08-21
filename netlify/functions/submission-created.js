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
      
      // Quick response messages
      const approvalMessage = `Hallo ${data.firstName},

vielen Dank für Ihre Buchungsanfrage bei UmutTaxi!

✅ Ihre Buchung wurde BESTÄTIGT:
📅 Datum: ${data.date}
⏰ Uhrzeit: ${data.time}
📍 Von: ${data.pickup}
🎯 Nach: ${data.destination}

Wir werden pünktlich am vereinbarten Ort sein.

Mit freundlichen Grüßen,
UmutTaxi Team
📞 +41 76 560 95 28`;

      const rejectionMessage = `Hallo ${data.firstName},

vielen Dank für Ihre Buchungsanfrage bei UmutTaxi.

❌ Leider können wir Ihre Buchung für den ${data.date} um ${data.time} nicht bestätigen.

Grund: [Bitte Grund angeben - z.B. bereits ausgebucht, außerhalb unseres Servicegebiets, etc.]

Gerne können wir Ihnen einen alternativen Termin anbieten.

Mit freundlichen Grüßen,
UmutTaxi Team
📞 +41 76 560 95 28`;

      emailHtml = `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 700px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
        .header { background: linear-gradient(135deg, #FDE046 0%, #facc15 100%); color: #000; padding: 25px; text-align: center; border-radius: 12px 12px 0 0; box-shadow: 0 2px 10px rgba(0,0,0,0.1); }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; box-shadow: 0 2px 10px rgba(0,0,0,0.05); }
        .section { margin-bottom: 30px; }
        .section h3 { color: #1f2937; margin-bottom: 15px; font-size: 20px; border-bottom: 3px solid #FDE046; padding-bottom: 8px; display: flex; align-items: center; }
        .section h3 .emoji { margin-right: 10px; font-size: 24px; }
        .info-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 15px; }
        .info-item { background: #f9fafb; padding: 15px; border-radius: 8px; border-left: 5px solid #FDE046; transition: all 0.3s ease; }
        .info-item:hover { transform: translateY(-2px); box-shadow: 0 4px 12px rgba(0,0,0,0.1); }
        .info-label { font-weight: bold; color: #374151; margin-bottom: 8px; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px; }
        .info-value { color: #1f2937; font-size: 16px; }
        .trip-details { background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); padding: 25px; border-radius: 12px; border: 2px solid #fbbf24; margin: 20px 0; }
        .footer { background: #1f2937; color: #fff; padding: 20px; text-align: center; border-radius: 0 0 12px 12px; font-size: 14px; }
        .urgent { background: #fee2e2; border-left-color: #ef4444; }
        .phone-link { color: #059669; text-decoration: none; font-weight: bold; padding: 5px 10px; background: #d1fae5; border-radius: 6px; display: inline-block; transition: all 0.3s ease; }
        .phone-link:hover { background: #a7f3d0; transform: scale(1.05); }
        
        /* Quick Response Buttons */
        .quick-response { background: linear-gradient(135deg, #e0f2fe 0%, #b3e5fc 100%); padding: 25px; border-radius: 12px; border: 2px solid #0288d1; margin: 25px 0; text-align: center; }
        .quick-response h3 { color: #01579b; margin-bottom: 20px; font-size: 22px; }
        .response-buttons { display: flex; gap: 15px; justify-content: center; flex-wrap: wrap; margin-bottom: 20px; }
        .btn { padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px; transition: all 0.3s ease; display: inline-block; border: none; cursor: pointer; }
        .btn-approve { background: linear-gradient(135deg, #4ade80 0%, #22c55e 100%); color: white; }
        .btn-approve:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(34, 197, 94, 0.4); }
        .btn-reject { background: linear-gradient(135deg, #f87171 0%, #ef4444 100%); color: white; }
        .btn-reject:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(239, 68, 68, 0.4); }
        .btn-call { background: linear-gradient(135deg, #60a5fa 0%, #3b82f6 100%); color: white; }
        .btn-call:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(59, 130, 246, 0.4); }
        
        .response-note { background: #fff3cd; border: 1px solid #ffeaa7; padding: 15px; border-radius: 8px; color: #856404; font-size: 14px; margin-top: 15px; }
        
        @media (max-width: 600px) {
            .container { padding: 10px; }
            .info-grid { grid-template-columns: 1fr; }
            .response-buttons { flex-direction: column; align-items: center; }
            .btn { width: 100%; max-width: 300px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🚕 Neue Taxi-Buchungsanfrage</h1>
            <p style="margin: 10px 0 0 0; font-size: 18px; font-weight: 500;">UmutTaxi - Premium Service</p>
        </div>
        
        <div class="content">
            <!-- Quick Response Section -->
            <div class="quick-response">
                <h3>🚀 HIZLI CEVAP - Tek Tıkla Müşteriye Cevap Ver!</h3>
                <div class="response-buttons">
                    <a href="mailto:${data.email || data.phone + '@sms.com'}?subject=✅ Buchung Bestätigt - UmutTaxi&body=${encodeURIComponent(approvalMessage)}" class="btn btn-approve">
                        ✅ SİPARİŞİ ONAYLA
                    </a>
                    <a href="mailto:${data.email || data.phone + '@sms.com'}?subject=❌ Buchung Abgelehnt - UmutTaxi&body=${encodeURIComponent(rejectionMessage)}" class="btn btn-reject">
                        ❌ SİPARİŞİ REDDET
                    </a>
                    <a href="tel:${data.phone}" class="btn btn-call">
                        📞 HEMEN ARA
                    </a>
                </div>
                <div class="response-note">
                    💡 <strong>Nasıl Kullanılır:</strong> Butona tıklayın → Email uygulamanız açılır → Mesaj hazır gelir → Sadece "Gönder"e basın!
                </div>
            </div>

            <div class="section">
                <h3><span class="emoji">👤</span>Kundendaten</h3>
                <div class="info-grid">
                    <div class="info-item">
                        <div class="info-label">👨‍💼 Name</div>
                        <div class="info-value">${data.firstName} ${data.lastName}</div>
                    </div>
                    <div class="info-item ${!data.phone ? 'urgent' : ''}">
                        <div class="info-label">📱 Telefon</div>
                        <div class="info-value">
                            ${data.phone ? `<a href="tel:${data.phone}" class="phone-link">📞 ${data.phone}</a>` : 'Nicht angegeben'}
                        </div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">📧 E-Mail</div>
                        <div class="info-value">
                            ${data.email ? `<a href="mailto:${data.email}" style="color: #0288d1; text-decoration: none;">${data.email}</a>` : 'Nicht angegeben'}
                        </div>
                    </div>
                </div>
            </div>

            <div class="section">
                <h3><span class="emoji">🚗</span>Fahrtdetails</h3>
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
                        <div class="info-value" style="text-transform: capitalize; font-weight: 600;">${data.service}</div>
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
                <h3><span class="emoji">📊</span>Buchungsdetails</h3>
                <div class="info-item">
                    <div class="info-label">🕐 Eingereicht am</div>
                    <div class="info-value">${currentDate}</div>
                </div>
            </div>
        </div>
        
        <div class="footer">
            <p><strong>🚕 UmutTaxi</strong> - Ihr zuverlässiger Partner für Transportdienstleistungen</p>
            <p>📞 <a href="tel:+41765609528" style="color: #FDE046; text-decoration: none;">+41 76 560 95 28</a> | ✉️ <a href="mailto:adem.polat03@hotmail.com" style="color: #FDE046; text-decoration: none;">adem.polat03@hotmail.com</a></p>
        </div>
    </div>
</body>
</html>`;

      emailText = `
🚕 NEUE TAXI-BUCHUNGSANFRAGE
================================

🚀 HIZLI CEVAP İÇİN:
📞 Direkt arama: ${data.phone || 'müşteri telefonu'}
📧 Email cevap: ${data.email || 'müşteri email adresi'}

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

🚀 HIZLI CEVAP İÇİN:
📞 Direkt arama: ${data.phone || 'müşteri telefonu'}
📧 Email cevap: ${data.email || 'müşteri email adresi'}

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
      cc: ['adem.polat03@hotmail.com'],
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