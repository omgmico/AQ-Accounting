# AQ Accounting - Tailwind CSS Project

A modern, responsive business accounting website built with Tailwind CSS featuring glassmorphism effects, smooth animations, and multilingual support.

## 🚀 Features

- **Modern Design**: Glassmorphism UI with backdrop filters and subtle animations
- **Responsive**: Mobile-first approach with custom breakpoints
- **Performance**: Optimized CSS build with PurgeCSS and minification
- **Animations**: Custom blob animations, fade-in effects, and smooth transitions
- **Internationalization**: Multi-language support (English/Montenegrin)
- **Custom Theme**: Brand colors, typography, and component system

## 🛠️ Tech Stack

- **Tailwind CSS 3.4+** - Utility-first CSS framework
- **PostCSS** - CSS processing pipeline
- **Express.js** - Lightweight server framework with compression
- **Node.js** - JavaScript runtime environment
- **Autoprefixer** - Vendor prefix automation
- **Service Worker** - Offline support and caching
- **Custom Components** - Glassmorphism cards, navigation, hero sections

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AQ-Accounting
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Build CSS (production)**
   ```bash
   npm run build
   ```

4. **Development mode (watch CSS)**
   ```bash
   npm run dev
   ```

5. **Start Express server**
   ```bash
   npm run start
   ```

6. **Build and serve (production mode)**
   ```bash
   npm run serve
   ```
   Then open http://localhost:3000 in your browser.

## 🎨 Custom Theme

### Colors
- **Primary**: `#0F74BC` (Professional blue)
- **Secondary**: `#24A9E1` (Accent blue)
- **Dark**: `#232629` (Text/headers)
- **Custom opacity values**: 11%, 46%, 65%, 78%, 93%

### Typography
- **Sans-serif**: Poppins (primary font)
- **Serif**: Merriweather (body text)

### Glassmorphism Shadows
- **Glass**: Multi-layered shadows with blue tints
- **Glass Hover**: Enhanced shadows for interactions
- **Hero**: Subtle image shadows
- **Nav**: Professional navigation shadows

## 🏗️ Project Structure

```
AQ-Accounting/
├── src/
│   └── input.css          # Tailwind source file
├── assets/
│   ├── css/
│   │   └── style.css      # Compiled output CSS
│   ├── js/
│   │   └── main.js        # JavaScript functionality
│   ├── images/            # Static images
│   ├── blobs/             # SVG blob animations
│   └── icons/             # Service icons
├── locales/               # i18n JSON files
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── package.json           # Dependencies and scripts
└── index.html             # Main HTML file
```

## 🎯 Available Scripts

- `npm run dev` - Start development watch mode
- `npm run build` - Build minified production CSS
- `npm run build:prod` - Build + optimize with Autoprefixer

## ⚡ Custom CSS Classes

### Glassmorphism Utilities
```css
.bg-glass         /* Standard glass background */
.bg-glass-light   /* Light glass background */
.bg-glass-strong  /* Strong glass background */
.border-glass     /* Glass border effect */
.blur-glass       /* Glass blur filter */
```

### Animation Classes
```css
.fade-in          /* Intersection observer animation */
.animate-float    /* Floating animation */
.animate-icon-pop /* Icon pop effect */
.gpu-accelerated  /* Hardware acceleration */
```

### Custom Components
- `.mesh-bg-anim` - Animated mesh background
- `.bg-blob` - Floating blob elements
- `.service-card` - Glassmorphism service cards
- `.nav-container` - Professional navigation
- `.hero-section` - Landing hero area

## 🎨 Glassmorphism Implementation

The project features advanced glassmorphism effects:

- **Backdrop Blur**: Multiple blur levels (8px, 10px, 12px)
- **Transparency**: RGBA backgrounds with controlled opacity
- **Layered Shadows**: Multi-depth shadows with brand colors
- **Animated Elements**: Floating blobs with dynamic positioning
- **Performance**: Hardware-accelerated transforms

## 🔧 Customization

### Adding New Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  brand: {
    500: '#YOUR_COLOR',
    // ... other shades
  }
}
```

### Custom Components
Add to `src/input.css` in the `@layer components` section:
```css
@layer components {
  .your-component {
    @apply bg-glass backdrop-blur-lg rounded-2xl;
  }
}
```

### New Utilities
Add to `src/input.css` in the `@layer utilities` section:
```css
@layer utilities {
  .your-utility {
    /* Custom CSS properties */
  }
}
```

## 📱 Responsive Design

Breakpoints:
- `xs`: 475px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🌍 Internationalization

The project supports multiple languages through JSON files in `/locales/`:
- `en.json` - English
- `cg.json` - Montenegrin

## 🚀 Deployment

1. **Build production CSS**:
   ```bash
   npm run build
   ```

2. **Upload files** to your web server

3. **Ensure proper paths** for assets are maintained

## 📄 Browser Support

- Modern browsers with CSS Grid support
- Backdrop-filter support for glassmorphism
- ES6+ for JavaScript features

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Make changes to `src/input.css`
4. Run `npm run build` to compile
5. Test thoroughly
6. Submit a pull request

## 📝 License

This project is licensed under the MIT License.

---

**Built with ❤️ using Tailwind CSS and modern web technologies.**
