# Roderick P. Tajos - Portfolio Website

A modern, responsive portfolio website showcasing my projects, skills, and achievements as an IT student and aspiring developer.

## 🚀 Live Demo

Visit the live website: [https://roderick-tajos.netlify.app](https://roderick-tajos.netlify.app)

## ✨ Features

- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Dark/Light Theme**: Toggle between dark and light modes
- **Interactive Animations**: Smooth scroll animations and hover effects
- **Contact Form**: Netlify Forms integration for easy contact
- **Project Showcase**: Display of personal projects with live links
- **Skills Section**: Technical skills and technologies
- **Certificates Carousel**: Interactive carousel for certifications
- **SEO Optimized**: Meta tags and structured data for better search visibility

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility
- **CSS3**: Modern CSS with custom properties and Grid/Flexbox
- **JavaScript (ES6+)**: Interactive functionality and animations
- **Netlify**: Hosting and form handling
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Inter font family)

## 📁 Project Structure

```
portfolio/
├── assets/                 # Images and media files
│   ├── barmms.png
│   ├── checkme.png
│   ├── lucias-pos.png
│   └── profile.jpg
├── css/
│   └── style.css          # Main stylesheet
├── js/
│   └── script.js          # JavaScript functionality
├── netlify/
│   └── functions/
│       └── contact.js     # Netlify function for contact form
├── php/                   # Legacy PHP files (not used in Netlify)
│   └── contact.php
├── index.html             # Main HTML file
├── netlify.toml           # Netlify configuration
├── package.json           # Node.js dependencies
└── README.md              # This file
```

## 🚀 Deployment on Netlify

### Method 1: Drag & Drop (Easiest)

1. Go to [netlify.com](https://netlify.com) and sign up/login
2. Drag and drop your project folder onto the Netlify dashboard
3. Your site will be deployed automatically!

### Method 2: Git Integration

1. Push your code to a GitHub repository
2. Connect your GitHub account to Netlify
3. Select your repository and deploy
4. Netlify will automatically deploy on every push to main branch

### Method 3: Netlify CLI

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Login to Netlify
netlify login

# Deploy to production
netlify deploy --prod

# Or deploy a preview
netlify deploy
```

## ⚙️ Configuration

### Environment Variables (Optional)

If you want to use the Netlify Function for email sending, add these environment variables in your Netlify dashboard:

- `SENDGRID_API_KEY`: Your SendGrid API key for email functionality

### Contact Form

The contact form uses Netlify Forms by default, which requires no additional configuration. Form submissions will appear in your Netlify dashboard under "Forms".

## 🎨 Customization

### Colors and Theme

Edit the CSS custom properties in `css/style.css`:

```css
:root {
    --primary-color: #e53935;    /* Main brand color */
    --primary-dark: #b71c1c;     /* Darker shade */
    --secondary-color: #212121;  /* Secondary color */
    /* ... other variables */
}
```

### Content Updates

1. **Personal Information**: Update `index.html` with your details
2. **Projects**: Modify the projects section with your own projects
3. **Skills**: Update the skills section with your technologies
4. **Images**: Replace images in the `assets/` folder

### Adding New Sections

1. Add HTML structure in `index.html`
2. Add corresponding CSS in `style.css`
3. Add any JavaScript functionality in `script.js`

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Development

### Local Development

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio.git

# Navigate to the project directory
cd portfolio

# Install dependencies (optional)
npm install

# Start local development server
npx netlify dev
```

### Building

This is a static site, so no build process is required. Simply upload the files to any static hosting service.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

**Roderick P. Tajos**
- Email: rodericktajos02@gmail.com
- GitHub: [@Riuoo](https://github.com/Riuoo)
- Facebook: [Roderick Tajos](https://www.facebook.com/roderick.tajos.3)

## 🙏 Acknowledgments

- Font Awesome for the amazing icons
- Google Fonts for the Inter font family
- Netlify for the excellent hosting platform
- All the open-source libraries and tools used

---

⭐ If you found this portfolio helpful, please give it a star on GitHub!
