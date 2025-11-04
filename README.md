# WPStarter

A modern WordPress theme starter with Vite, built for efficient development and optimized production builds.

Heavily inspired by [WordPressify](https://www.wordpressify.co/).

## Features

- ⚡ **Vite 6** - Lightning fast HMR and optimized builds
- 🎨 **Sass** - Modern CSS preprocessing with the latest Sass compiler
- 🔄 **Live Reload** - Automatic browser refresh for PHP file changes
- 📦 **Modern Build Tools** - PostCSS with Autoprefixer and modern CSS features
- 🎯 **WordPress Integration** - Automated WordPress installation and management
- 🔧 **Environment Variables** - Secure configuration with .env files
- ✨ **Code Quality** - ESLint and Prettier for consistent, clean code
- 🎨 **Stylelint** - SCSS linting with modern rules
- 📱 **Bootstrap 4** - Responsive framework included
- 🖼️ **Image Optimization** - Sharp for modern image processing
- 🔒 **WordPress 6.6+ Ready** - theme.json version 3 support

## Requirements

- [Node.js](https://nodejs.org/) >= 18.0.0
- [npm](https://www.npmjs.com/) >= 9.0.0
- [PHP](https://www.php.net/) >= 7.4
- [MySQL](https://www.mysql.com/) >= 5.7
- [wp-cli](https://wp-cli.org/)

## Quick Start

### 1. Installation

```bash
# Clone the repository
git clone https://github.com/msteinerweb/wpstarter.git
cd wpstarter

# Install dependencies
npm install

# Copy .env.example to .env and configure
cp .env.example .env
```

### 2. Configure Your Project

Edit `.env` file with your project settings:

```env
# Site Configuration
SITE_TITLE="My Awesome Site"
SITE_THEME_NAME="MyTheme"
SITE_ADMIN_USER="admin"
SITE_ADMIN_PASSWORD="secure-password"
SITE_ADMIN_EMAIL="you@example.com"

# Database Configuration
DB_NAME="my_database"
DB_USER="root"
DB_PASSWORD="your-db-password"
DB_HOST="localhost"
```

### 3. Install WordPress

```bash
npm run wpinstall
```

This will:
- Download the latest WordPress
- Create the database
- Install and configure WordPress
- Install configured plugins
- Set up your theme

### 4. Start Development

```bash
npm run dev
```

This starts Vite's dev server with:
- Hot Module Replacement (HMR) for JS/CSS
- Live reload for PHP files
- Source maps for debugging
- Fast, incremental builds

Access your site at the WordPress URL (typically `http://localhost:8080` or configured in your local PHP server).

### 5. Build for Production

```bash
npm run prod
```

This will:
- Build optimized, minified assets with Vite
- Copy theme files to build directory
- Package everything into a deployable zip file
- Output: `./backups/{theme-name}-{timestamp}.zip`

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start Vite dev server with HMR |
| `npm run build` | Build production assets |
| `npm run preview` | Preview production build |
| `npm run prod` | Build and package theme for production |
| `npm run wpinstall` | Install WordPress from scratch |
| `npm run wpbackup` | Backup WordPress database and wp-content |
| `npm run wprestore` | Restore WordPress from backup |
| `npm run lint:js` | Lint JavaScript files |
| `npm run lint:css` | Lint SCSS files |
| `npm run format` | Format code with Prettier |

## Project Structure

```
wpstarter/
├── src/
│   ├── assets/
│   │   ├── js/           # JavaScript source files
│   │   │   └── main.js   # Main JS entry point
│   │   ├── scss/         # Sass/SCSS source files
│   │   │   └── style.scss # Main stylesheet
│   │   ├── fonts/        # Font files
│   │   └── img/          # Image assets
│   ├── blocks/           # Custom Gutenberg blocks
│   ├── plugins/          # Custom WordPress plugins
│   └── theme/            # WordPress theme files (PHP templates)
│       └── theme.json    # WordPress theme configuration (v3)
├── build/                # Built WordPress installation
│   └── wordpress/
│       └── wp-content/
│           └── themes/
│               └── {theme-name}/  # Your built theme
├── backups/              # WordPress backups and production zips
├── gulpfile.js/          # Gulp tasks for WordPress operations
├── vite.config.js        # Vite configuration
├── postcss.config.js     # PostCSS configuration
├── config.js             # Project configuration (uses .env)
├── .env                  # Environment variables (create from .env.example)
└── package.json          # Dependencies and scripts
```

## Configuration

### Environment Variables (.env)

Copy `.env.example` to `.env` and customize:

- **Site Settings** - Title, theme name, admin credentials
- **Database** - Connection details and table prefix
- **WordPress Options** - Timezone, week start day
- **Plugins** - Comma-separated list of plugins to install

### Vite Configuration (vite.config.js)

The Vite config includes:
- React support for modern WordPress blocks
- Sass preprocessing with modern compiler
- PostCSS with Autoprefixer
- Live reload for PHP files
- Optimized asset output structure
- Path aliases for cleaner imports

### WordPress Theme (theme.json)

Using WordPress 6.6+ theme.json version 3:
- Custom color palette
- Typography settings
- Layout options
- Block editor configuration

## Development Workflow

### Adding JavaScript

```javascript
// src/assets/js/main.js
import './components/header';
import './components/navigation';

// Use modern ES modules
const myFunction = () => {
    console.log('Hello from Vite!');
};

export default myFunction;
```

### Adding Styles

```scss
// src/assets/scss/style.scss
@use 'variables';
@use 'mixins';

.my-component {
    @include mixins.flex-center;
    color: variables.$primary-color;
}
```

### Using Path Aliases

```javascript
import myModule from '@/assets/js/myModule';
import styles from '@scss/components/header.scss';
```

### Custom Gutenberg Blocks

Place block source files in `src/blocks/` - they'll be automatically compiled and copied to your theme.

## Backup & Restore

### Create Backup

```bash
npm run wpbackup
```

Creates timestamped backup in `./backups/` containing:
- SQL database dump
- wp-content directory

### Restore Backup

```bash
npm run wprestore
```

Prompts you to select from available backups and restores:
- Database from SQL dump
- wp-content files

## Code Quality

### Linting

```bash
# Lint JavaScript
npm run lint:js

# Lint CSS/SCSS
npm run lint:css
```

### Formatting

```bash
# Format all source files
npm run format
```

Prettier is configured to work with ESLint and formats:
- JavaScript/JSX
- SCSS/CSS
- JSON files

## Modernization Features

This starter has been updated with modern tooling:

✅ **Vite 6** - Replaced Gulp+Browserify for 10-50x faster builds
✅ **Modern Sass** - Using sass-embedded for latest features
✅ **PostCSS** - Autoprefixer and modern CSS features
✅ **ESLint 8** - Updated rules with Prettier integration
✅ **Stylelint 16** - Modern SCSS linting
✅ **Sharp** - Fast, modern image optimization
✅ **Environment Variables** - Secure .env configuration
✅ **WordPress 6.6+** - theme.json v3 support
✅ **Node 18+** - Latest LTS features

## Troubleshooting

### Port Already in Use

If port 3000 is taken, Vite will automatically try the next available port.

### MySQL Connection Issues

- Verify MySQL is running
- Check credentials in `.env`
- Ensure database user has proper permissions

### WordPress Installation Fails

- Verify wp-cli is installed: `wp --info`
- Check PHP is in PATH
- Ensure proper file permissions

### Vite Build Issues

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see LICENSE file for details

## Credits

- Inspired by [WordPressify](https://www.wordpressify.co/)
- Built with [Vite](https://vitejs.dev/)
- Powered by [WordPress](https://wordpress.org/)

## Support

For issues and questions:
- [GitHub Issues](https://github.com/msteinerweb/wpstarter/issues)
- [WordPress Documentation](https://developer.wordpress.org/)
- [Vite Documentation](https://vitejs.dev/)
