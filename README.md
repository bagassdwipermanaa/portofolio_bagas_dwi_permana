# Bagas Dwi Permana - Portfolio Website

A modern, responsive portfolio website built with React, showcasing my skills as a Software Engineering Student and Full-Stack Developer.

## 🚀 Features

- **Modern Design**: Clean, professional UI with smooth animations using Framer Motion
- **Responsive**: Fully responsive design that works on all devices
- **Interactive**: Live code playground, hover effects, and cursor trail
- **SEO Optimized**: Complete SEO setup with meta tags, sitemap, and robots.txt
- **Accessible**: ARIA labels, keyboard navigation, and screen reader support
- **Performance**: Lazy loading, error boundaries, and optimized images
- **Analytics Ready**: Google Analytics integration

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **UI Components**: Radix UI
- **Deployment**: Vercel

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   ├── About.jsx          # About section
│   ├── Certifications.jsx # Certifications showcase
│   ├── Contact.jsx        # Contact form
│   ├── Education.jsx      # Education timeline
│   ├── ErrorBoundary.jsx  # Error handling
│   ├── FAQ.jsx           # Frequently asked questions
│   ├── Footer.jsx        # Footer component
│   ├── Hero.jsx          # Hero section
│   ├── LazyImage.jsx     # Optimized image loading
│   ├── LoadingSpinner.jsx # Loading states
│   ├── LiveCodePlayground.jsx # Interactive code editor
│   ├── Navbar.jsx        # Navigation
│   ├── NotFound.jsx      # 404 page
│   ├── Projects.jsx      # Projects showcase
│   ├── Roadmap.jsx       # Career roadmap
│   └── Welcome.jsx       # Welcome screen
├── lib/
│   └── utils.js          # Utility functions
├── App.jsx               # Main app component
├── index.css             # Global styles
└── main.jsx              # Entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/bagassdwipermana/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 📱 Sections

- **Hero**: Introduction with animated text and call-to-action buttons
- **About**: Personal information and skills with interactive cards
- **Education**: Academic background and achievements
- **Projects**: Portfolio showcase with project details
- **Certifications**: Professional certifications and achievements
- **Roadmap**: Career development timeline
- **Live Code Playground**: Interactive coding demonstration
- **FAQ**: Frequently asked questions
- **Contact**: Contact form with backend integration

## 🎨 Customization

### Colors

The website uses a dark theme with custom color palette defined in `tailwind.config.js`.

### Content

Update the content in each component file to match your information:

- Personal details in `Hero.jsx`
- Skills and about info in `About.jsx`
- Projects in `Projects.jsx`
- Education in `Education.jsx`
- Certifications in `Certifications.jsx`

### Styling

Modify `src/index.css` for global styles and component-specific styles in each component file.

## 🔧 Configuration

### Google Analytics

Replace `GA_MEASUREMENT_ID` in `index.html` with your actual Google Analytics measurement ID.

### Contact Form

The contact form is configured to send emails via a backend API. Update the API endpoint in `Contact.jsx` to match your backend service.

### SEO

Update the meta tags in `index.html` and `sitemap.xml` with your actual website URL and information.

## 📈 Performance

- Lazy loading for images
- Code splitting with React.lazy
- Optimized animations
- Compressed assets
- CDN for external resources

## ♿ Accessibility

- ARIA labels and roles
- Keyboard navigation support
- Screen reader compatibility
- High contrast ratios
- Focus indicators

## 🚀 Deployment

The website is configured for deployment on Netlify:

1. Connect your GitHub repository to Netlify
2. Configure build settings:
   - Build Command: `npm run build`
   - Publish Directory: `dist`
3. Deploy!

### Netlify Configuration

The project includes:

- `_redirects` file for SPA routing
- `manifest.json` for PWA support
- `sitemap.xml` and `robots.txt` for SEO

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

## 📞 Contact

Bagas Dwi Permana - [@bagassdwipermana](https://github.com/bagassdwipermana) - contact.bagasdp@gmail.com

Project Link: [https://github.com/bagassdwipermana/portfolio](https://github.com/bagassdwipermana/portfolio)
Live Demo: [https://bagasdwipermana.netlify.app](https://bagasdwipermana.netlify.app)

---

⭐ Star this repository if you found it helpful!
