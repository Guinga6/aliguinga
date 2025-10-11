# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

This is Ali Guinga's professional portfolio website showcasing his academic background, technical skills, and projects as an engineering student at ENSA Tétouan specializing in Data Science, Big Data, and AI. The website serves as a comprehensive digital resume for potential employers and collaborators.

## Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (Vanilla ES6+)
- **Styling**: Custom CSS with CSS Variables, Google Fonts (Inter, Poppins)
- **Icons**: Font Awesome 6.5.1
- **Deployment**: GitHub Pages via GitHub Actions
- **Version Control**: Git

## Project Architecture

### File Structure
- `index.html` - Single-page application with all sections
- `css/style.css` - Comprehensive stylesheet with CSS custom properties
- `js/script.js` - Interactive functionality and animations
- `images/` - Project images, certificates, and profile photos
- `files/` - Resume PDF and other downloadable files
- `.github/workflows/static.yml` - GitHub Actions deployment pipeline

### Key Components

#### CSS Architecture
- **CSS Custom Properties**: Extensive use of CSS variables for theming
- **Color System**: Primary (#2563eb), secondary, accent, and neutral color palettes
- **Responsive Design**: Mobile-first approach with flexible layouts
- **Component-based Styling**: Modular CSS with reusable classes

#### JavaScript Functionality
- **Utility Functions**: Debounce, throttle, viewport detection, smooth scrolling
- **Interactive Features**: Typing effect, skill animations, project filtering
- **UI Components**: Mobile menu, popup modals, progress indicators
- **Scroll Effects**: Active navigation, back-to-top, parallax, header hiding

## Common Development Commands

### Local Development
```powershell
# Serve the website locally (using Python)
python -m http.server 8000

# Alternative with Node.js (if http-server is installed)
npx http-server

# Open directly in browser
start index.html
```

### Git Operations
```powershell
# Check current status
git status

# View recent commits
git --no-pager log --oneline -10

# Add and commit changes
git add .
git commit -m "Update portfolio content"

# Push to trigger deployment
git push origin main
```

### File Operations
```powershell
# View project structure
Get-ChildItem -Recurse -Name

# Check file sizes (useful for optimization)
Get-ChildItem -Recurse | Select-Object Name, Length | Sort-Object Length -Descending
```

### Deployment
The website automatically deploys to GitHub Pages when changes are pushed to the `main` branch via the GitHub Actions workflow at `.github/workflows/static.yml`.

**Live URL**: https://guinga6.github.io/aliguinga/

## Development Workflow

### Making Changes
1. **Content Updates**: Edit `index.html` for text/structure changes
2. **Styling**: Modify `css/style.css` for visual updates
3. **Functionality**: Update `js/script.js` for interactive features
4. **Assets**: Add images to `images/` folder, documents to `files/`

### Testing Locally
Always test changes locally before pushing:
1. Start a local server
2. Test responsive design on different screen sizes
3. Verify JavaScript functionality works
4. Check for console errors

### Key JavaScript Functions to Understand

#### Core Initialization
- `initYoutubeBanner()` - YouTube support banner
- `initSkillBars()` - Skill percentage animations
- `initProjectsFilter()` - Project category filtering
- `initSmoothScrolling()` - Navigation scroll behavior
- `initTypingEffect()` - Hero section typing animation
- `initPFAPopup()` - Internship seeking popup modal

#### Utility Functions
- `utils.debounce()` - Performance optimization for events
- `utils.throttle()` - Limit function execution frequency
- `utils.isInViewport()` - Element visibility detection
- `animateCounter()` - Number animation with easing

### CSS Custom Properties to Know

#### Colors
- `--primary-color: #2563eb` - Main brand color
- `--dark-color: #1e293b` - Text color
- `--light-color: #f8fafc` - Background variants

#### Spacing & Layout
- `--spacing-md: 1rem` through `--spacing-3xl: 4rem`
- `--radius-sm: 0.375rem` through `--radius-2xl: 1.5rem`

#### Animation & Effects
- `--transition-fast: 0.15s` through `--transition-slow: 0.5s`
- Multiple gradient definitions for visual effects

## Content Management

### Adding New Projects
1. Add project image to `images/` folder
2. Update the projects section in `index.html`
3. Add appropriate `data-category` attribute for filtering

### Adding Certificates
1. Add certificate image to `images/` folder
2. Update certificates section in `index.html`
3. Ensure proper alt text for accessibility

### Updating Skills
1. Modify skills section in `index.html`
2. Set appropriate percentage in the `style` attribute of `.skill-level`
3. Skills are auto-animated on page load and scroll

## Performance Considerations

- All images should be optimized for web
- JavaScript uses throttling/debouncing for scroll events
- CSS animations use transform properties for better performance
- Font loading is optimized with `display=swap`

## Browser Compatibility

The website uses modern JavaScript and CSS features but maintains good browser support:
- CSS Custom Properties (IE 11+ with fallbacks)
- JavaScript ES6+ features (modern browsers)
- Responsive design works on all device sizes

## Maintenance Notes

- YouTube banner auto-hides after 10 seconds
- PFA popup shows internship availability status
- Skills animations trigger on scroll into viewport
- All external links open in new tabs
- Contact form currently shows success message (no backend)