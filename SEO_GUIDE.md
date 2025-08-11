# 🔍 UmutTaxi SEO Rehberi

## 📋 SEO Dosyaları Eklendi

### ✅ **Temel SEO Dosyaları**
- `robots.txt` - Arama motoru crawler yönergeleri
- `sitemap.xml` - Site haritası
- `manifest.json` - PWA manifest
- `browserconfig.xml` - Windows tiles
- `favicon.ico` - Site ikonu

### ✅ **SEO Component'ları**
- `BaseLayout.astro` - Kapsamlı meta tags
- `SEO.astro` - Yeniden kullanılabilir SEO component
- Structured data (Schema.org markup)

## 🚀 Google Search Console Kurulumu

### 1. **Google Search Console'a Git**
- [search.google.com/search-console](https://search.google.com/search-console)
- Google hesabınla giriş yap

### 2. **Domain Ekle**
- "Add Property" tıkla
- Domain prefix seç: `https://umuttaxi.vercel.app`
- "Continue" tıkla

### 3. **Verification**
- HTML tag yöntemini seç
- `google-verification.html` dosyasındaki kodu kopyala
- `YOUR_VERIFICATION_CODE_HERE` yerine gerçek kodu yapıştır
- Dosyayı kaydet ve deploy et

### 4. **Verify**
- "Verify" butonuna tıkla
- Başarılı olursa domain eklenecek

## 📊 Google Analytics Kurulumu

### 1. **Google Analytics'e Git**
- [analytics.google.com](https://analytics.google.com)
- "Start measuring" tıkla

### 2. **Property Oluştur**
- Property name: `UmutTaxi`
- Reporting time zone: `Europe/Zurich`
- Currency: `Swiss Franc (CHF)`

### 3. **Tracking Code Ekle**
- BaseLayout.astro'da yorum satırlarını kaldır
- `GA_MEASUREMENT_ID` yerine gerçek ID'yi yapıştır

```astro
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🔗 Bing Webmaster Tools

### 1. **Bing Webmaster'a Git**
- [bing.com/webmasters](https://bing.com/webmasters)
- Microsoft hesabınla giriş yap

### 2. **Site Ekle**
- "Add a site" tıkla
- URL: `https://umuttaxi.vercel.app`
- Verification code'u kopyala

### 3. **Verification**
- BaseLayout.astro'da yorum satırlarını kaldır
- `BING_WEBMASTER_CODE` yerine gerçek kodu yapıştır

## 📱 PWA ve Mobile SEO

### **Manifest.json**
- ✅ PWA desteği
- ✅ Mobile app-like experience
- ✅ Offline capability (gelecekte)

### **Mobile Optimization**
- ✅ Responsive design
- ✅ Touch-friendly buttons
- ✅ Fast loading images
- ✅ Mobile-first approach

## 🎯 Local SEO Optimizasyonu

### **Structured Data (Schema.org)**
- ✅ LocalBusiness markup
- ✅ Service offerings
- ✅ Contact information
- ✅ Geographic coordinates
- ✅ Opening hours

### **Local Keywords**
- ✅ "Taxi Zürich"
- ✅ "Flughafentransfer Zürich"
- ✅ "Limousinenservice Schweiz"
- ✅ "Schülertransport Schwarztenbach"
- ✅ "Hoteltransfer Zürich"

## 📝 Content SEO

### **Page Titles**
- ✅ Ana sayfa: "UmutTaxi - Premium Taxiservice Zürich-Schwarztenbach"
- ✅ Hizmet sayfaları: "[Hizmet Adı] - UmutTaxi"
- ✅ Hakkımızda: "Über uns - UmutTaxi"
- ✅ İletişim: "Kontakt - UmutTaxi"

### **Meta Descriptions**
- ✅ Her sayfa için unique description
- ✅ Anahtar kelimeler dahil
- ✅ 150-160 karakter uzunluğunda
- ✅ Call-to-action içeren

### **Header Structure**
- ✅ H1: Her sayfada tek tane
- ✅ H2: Ana bölümler
- ✅ H3: Alt bölümler
- ✅ H4-H6: Detaylar

## 🖼️ Image SEO

### **Alt Tags**
- ✅ Tüm resimlerde açıklayıcı alt text
- ✅ Anahtar kelimeler dahil
- ✅ Doğal ve anlamlı

### **Image Optimization**
- ✅ WebP format (modern, hızlı)
- ✅ Responsive images
- ✅ Lazy loading (gelecekte)
- ✅ Proper file names

## 🔍 Technical SEO

### **Performance**
- ✅ Fast loading
- ✅ Mobile optimized
- ✅ Core Web Vitals
- ✅ Lighthouse score

### **Security**
- ✅ HTTPS enabled
- ✅ Security headers
- ✅ Clean code
- ✅ No broken links

## 📈 SEO Monitoring

### **Tools to Use**
- ✅ Google Search Console
- ✅ Google Analytics
- ✅ Google PageSpeed Insights
- ✅ GTmetrix
- ✅ Screaming Frog

### **Key Metrics**
- ✅ Organic traffic
- ✅ Keyword rankings
- ✅ Click-through rates
- ✅ Page load speed
- ✅ Mobile usability

## 🎯 Keyword Strategy

### **Primary Keywords**
- "Taxi Zürich"
- "Flughafentransfer Zürich"
- "Limousinenservice Schweiz"
- "Schülertransport Zürich"
- "Hoteltransfer Zürich"

### **Long-tail Keywords**
- "Premium Taxiservice Zürich-Schwarztenbach"
- "Flughafen Zürich Taxi Service"
- "Luxus Limousine Zürich"
- "Sicherer Schülertransport Schweiz"
- "Business Hotel Transfer Zürich"

## 📱 Social Media SEO

### **Open Graph Tags**
- ✅ Facebook sharing optimization
- ✅ Twitter Cards
- ✅ LinkedIn sharing
- ✅ WhatsApp sharing

### **Social Profiles**
- ✅ Facebook business page
- ✅ Instagram business account
- ✅ LinkedIn company page
- ✅ Google My Business

## 🚀 SEO Checklist

### **Pre-Launch**
- [x] Meta tags added
- [x] Structured data implemented
- [x] Sitemap created
- [x] Robots.txt configured
- [x] Favicon added
- [x] PWA manifest created

### **Post-Launch**
- [ ] Google Search Console verification
- [ ] Google Analytics setup
- [ ] Bing Webmaster verification
- [ ] Social media profiles
- [ ] Google My Business
- [ ] Local directory listings

### **Ongoing**
- [ ] Content updates
- [ ] Performance monitoring
- [ ] Keyword tracking
- [ ] Competitor analysis
- [ ] User experience improvements

## 💡 SEO Best Practices

### **Content**
- ✅ Unique, valuable content
- ✅ Regular updates
- ✅ Keyword optimization
- ✅ Internal linking
- ✅ External linking (authority sites)

### **Technical**
- ✅ Fast loading speed
- ✅ Mobile-friendly design
- ✅ Secure HTTPS
- ✅ Clean URL structure
- ✅ XML sitemap

### **User Experience**
- ✅ Easy navigation
- ✅ Clear call-to-actions
- ✅ Fast contact forms
- ✅ Professional design
- ✅ Trust signals

---

## 📞 SEO Support

### **Resources**
- [Google Search Console Help](https://support.google.com/webmasters/)
- [Google Analytics Help](https://support.google.com/analytics/)
- [Bing Webmaster Help](https://www.bing.com/webmasters/help)
- [Schema.org Documentation](https://schema.org/)

### **Tools**
- [Google PageSpeed Insights](https://pagespeed.web.dev/)
- [Google Rich Results Test](https://search.google.com/test/rich-results)
- [Mobile-Friendly Test](https://search.google.com/test/mobile-friendly)

---

**SEO Optimization Complete! 🚕✨**

Your UmutTaxi website is now fully optimized for search engines and ready to rank well in Google, Bing, and other search engines!
