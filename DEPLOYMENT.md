# 🚀 UmutTaxi Vercel Deployment Guide

## 📋 Prerequisites

- [Node.js](https://nodejs.org/) 18.0.0 or higher
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- [Vercel CLI](https://vercel.com/cli) (optional, for local testing)
- [Git](https://git-scm.com/) repository

## 🛠️ Local Development

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Build for Production
```bash
npm run build
```

### 4. Preview Production Build
```bash
npm run preview
```

## 🚀 Deploy to Vercel

### Method 1: Vercel Dashboard (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Sign in with GitHub
   - Click "New Project"
   - Import your GitHub repository

3. **Configure Project**
   - **Framework Preset**: Astro
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

4. **Environment Variables** (if needed)
   - `SITE_URL`: Your production URL
   - `GOOGLE_MAPS_API_KEY`: Google Maps API key
   - `GOOGLE_ANALYTICS_ID`: Google Analytics ID

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete

### Method 2: Vercel CLI

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Follow Prompts**
   - Link to existing project or create new
   - Confirm settings
   - Deploy

## ⚙️ Configuration Files

### `vercel.json`
- Build commands and output directory
- Security headers
- Image caching
- Redirects

### `package.json`
- Build scripts
- Dependencies
- Node.js version requirements

### `.gitignore`
- Excludes build files and environment variables
- Keeps repository clean

## 🔧 Environment Variables

Create a `.env.local` file for local development:

```bash
# Site Configuration
SITE_URL=http://localhost:4321
SITE_NAME=UmutTaxi
SITE_DESCRIPTION=Premium Taxiservice in Zürich-Schwarztenbach

# Contact Information
CONTACT_PHONE=+41441234567
CONTACT_EMAIL=info@umuttaxi.ch

# Google Maps API (if needed)
GOOGLE_MAPS_API_KEY=your_api_key_here

# Analytics (if needed)
GOOGLE_ANALYTICS_ID=your_ga_id_here
```

## 📱 Custom Domain (Optional)

1. **Add Domain in Vercel**
   - Go to Project Settings
   - Click "Domains"
   - Add your custom domain

2. **Update DNS Records**
   - Add CNAME record pointing to Vercel
   - Wait for DNS propagation

3. **SSL Certificate**
   - Vercel automatically provides SSL
   - No additional configuration needed

## 🚨 Troubleshooting

### Build Errors
- Check Node.js version (18+ required)
- Clear `node_modules` and reinstall
- Verify all dependencies are installed

### Image Issues
- Ensure images are in `public/images/` folder
- Check file paths in code
- Verify image formats (WebP recommended)

### Environment Variables
- Check Vercel dashboard for correct values
- Ensure variables are set for production
- Test locally with `.env.local`

## 📊 Performance Optimization

### Images
- Use WebP format for better compression
- Optimize image sizes
- Implement lazy loading if needed

### Build
- Enable Vercel's automatic optimization
- Use CDN for static assets
- Implement proper caching headers

## 🔒 Security

- HTTPS automatically enabled
- Security headers configured in `vercel.json`
- Environment variables protected
- No sensitive data in repository

## 📈 Monitoring

- Vercel Analytics (optional)
- Performance monitoring
- Error tracking
- Uptime monitoring

## 🎯 Next Steps

After successful deployment:

1. **Test All Pages**
   - Homepage
   - Service pages
   - Contact forms
   - Mobile responsiveness

2. **SEO Setup**
   - Google Search Console
   - Google Analytics
   - Meta tags verification

3. **Performance**
   - Lighthouse audit
   - Core Web Vitals
   - Mobile optimization

4. **Backup**
   - Regular database backups (if applicable)
   - Content backup
   - Configuration backup

---

## 📞 Support

For deployment issues:
- Check [Vercel Documentation](https://vercel.com/docs)
- Review build logs in Vercel dashboard
- Check [Astro Documentation](https://docs.astro.build)

---

**Happy Deploying! 🚕✨**
