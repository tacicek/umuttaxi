# Mail Kurulum Rehberi - UmutTaxi

## 🚨 Mevcut Durum

Projenizde şu anda **FormSubmit** servisi kullanılıyor ancak mail alıp alamadığınız belirsiz. Bu rehber ile mail sorununu çözeceğiz.

## 🔍 Sorun Tespiti

### 1. FormSubmit Durumu
- Token: `c24008fc63f4c2f98fc7a8bc15f1f2d5`
- Durum: Aktif ama doğrulama gerekebilir
- Test sayfası: `/mail-test`

### 2. Netlify Function
- Dosya: `netlify/functions/submission-created.js`
- Durum: SendGrid entegrasyonu hazır
- Paket: `@sendgrid/mail` kuruldu

## 🛠️ Çözüm Adımları

### Adım 1: FormSubmit Doğrulama
1. `/mail-test` sayfasına gidin
2. Test formu doldurun ve gönderin
3. FormSubmit size doğrulama maili gönderecek
4. Maili açıp linke tıklayın

### Adım 2: SendGrid Kurulumu (Önerilen)
1. [SendGrid](https://sendgrid.com) hesabı oluşturun
2. API Key alın
3. Domain doğrulaması yapın
4. Environment variables ekleyin:

```bash
# .env.local dosyasına ekleyin
SENDGRID_API_KEY=your_api_key_here
SENDGRID_FROM_EMAIL=noreply@umuttaxi.ch
```

### Adım 3: Netlify Environment Variables
Netlify dashboard'da şu değişkenleri ekleyin:
- `SENDGRID_API_KEY`: SendGrid API anahtarınız
- `SENDGRID_FROM_EMAIL`: Gönderen mail adresi

## 📧 Mail Test Etme

### Test Sayfası
```
https://taxiumut.ch/mail-test
```

### Manuel Test
```bash
# Terminal'de test edin
curl -X POST "https://formsubmit.co/c24008fc63f4c2f98fc7a8bc15f1f2d5" \
  -H "Content-Type: application/json" \
  -d '{"test": "mail test"}'
```

## 🔧 Alternatif Çözümler

### 1. Gmail SMTP
```javascript
// Gmail SMTP kullanımı
const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransporter({
  service: 'gmail',
  auth: {
    user: 'your-email@gmail.com',
    pass: 'your-app-password'
  }
});
```

### 2. Mailgun
```javascript
// Mailgun kullanımı
const mailgun = require('mailgun-js')({
  apiKey: process.env.MAILGUN_API_KEY,
  domain: process.env.MAILGUN_DOMAIN
});
```

### 3. AWS SES
```javascript
// AWS SES kullanımı
const AWS = require('aws-sdk');
const ses = new AWS.SES({
  region: 'eu-west-1',
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
});
```

## 📋 Kontrol Listesi

- [ ] FormSubmit doğrulandı mı?
- [ ] Test maili geldi mi?
- [ ] SendGrid hesabı oluşturuldu mu?
- [ ] API Key alındı mı?
- [ ] Domain doğrulandı mı?
- [ ] Environment variables eklendi mi?
- [ ] Netlify'da değişkenler ayarlandı mı?
- [ ] Test sayfası çalışıyor mu?

## 🆘 Sorun Giderme

### Mail Gelmiyor
1. Spam klasörünü kontrol edin
2. FormSubmit doğrulamasını yapın
3. API Key'leri kontrol edin
4. Netlify function loglarını inceleyin

### Hata Mesajları
- `401 Unauthorized`: API Key yanlış
- `403 Forbidden`: Domain doğrulanmamış
- `429 Too Many Requests`: Rate limit aşıldı

## 📞 Destek

Mail sorunları için:
- Email: tuncaycicek@outlook.com
- Telefon: +41 76 560 95 28

## 🔄 Güncellemeler

- **2024-01-XX**: SendGrid entegrasyonu eklendi
- **2024-01-XX**: Test sayfası oluşturuldu
- **2024-01-XX**: Mail kurulum rehberi yazıldı
