# SIGNAASAT - Healthcare Acquisition & AI Infrastructure

SIGNAASAT combines performance acquisition, proprietary ad-tech infrastructure, and AI agents to help hospitals acquire, convert, and scale patients globally.

## 📁 Project Structure

```
signaasat/
├── index.html              # Main landing page
├── assets/                 # Static assets
│   ├── css/
│   │   └── shared.css     # Global styles
│   ├── js/
│   │   └── script.js      # Interactive functionality
│   └── images/            # Image assets
├── pages/                 # Additional pages
│   ├── blog.html         # Blog listing
│   ├── blog-detail.html  # Blog post detail
│   ├── contact.html      # Contact form
│   └── legal.html        # Legal pages (Terms, Privacy, Cookies)
├── docs/                 # Documentation
│   ├── SIGNAASAT_CONTEXT.md
│   └── CHECKLIST.md
├── .gitignore           # Git ignore rules
└── README.md            # This file
```

## 🚀 Features

### Dashboard Analytics
- **Live Performance Tracking**: Real-time acquisition metrics
- **Interactive Filters**: 1W/1M/3M period views with animated transitions
- **Auto-updating Numbers**: Subtle animations on live data

### AI Agents (6 Core Capabilities)
1. Lead Qualification
2. Patient Communication
3. Follow-ups & Reminders
4. Conversion Optimization
5. Journey Automation
6. Multi-language Support (50+ languages)

### Responsive Design
- ✅ Mobile-first approach
- ✅ Optimized for 13-16" laptops
- ✅ Tablet & desktop responsive
- ✅ Dark/Light theme support

## 🛠️ Tech Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Icons**: Lucide Icons
- **Fonts**: System fonts (SF Pro Display/Text, Helvetica Neue)
- **Features**:
  - Custom cursor with ring follow
  - Scroll animations
  - Theme persistence
  - Period filter functionality

## 📦 Deployment

### Quick Deploy (Static Hosting)

#### Netlify / Vercel
```bash
# Deploy entire folder
netlify deploy --prod
# or
vercel --prod
```

#### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin <your-repo>
git push -u origin main
```
Then enable GitHub Pages in repository settings.

### Manual Server Deploy
```bash
# Upload to server
scp -r ./* user@server:/var/www/signaasat/

# Nginx configuration example
server {
    listen 80;
    server_name signaasat.com;
    root /var/www/signaasat;
    index index.html;

    location / {
        try_files $uri $uri/ =404;
    }
}
```

## 🎨 Customization

### Colors (CSS Variables)
Edit `assets/css/shared.css`:
```css
--accent: #7b6ef6;      /* Primary brand color */
--teal: #4fcce8;        /* Secondary accent */
--green: #3dd68c;       /* Success/positive */
```

### Dashboard Data
Edit `assets/js/script.js` - `periodData` object:
```javascript
const periodData = {
  '1W': { leads: '3,847', ... },
  '1M': { leads: '18,427', ... },
  '3M': { leads: '52,891', ... }
};
```

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🔧 Performance Optimizations

- Lazy loading for images
- CSS animations with GPU acceleration
- Debounced scroll events
- Minimal external dependencies
- Compressed assets ready for CDN

## 📄 License

Copyright © 2025 SIGNAASAT. All rights reserved.

## 🤝 Support

For questions or support, contact: [Add contact details]

---

**Built with ❤️ for modern healthcare acquisition**
