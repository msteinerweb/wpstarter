# NPM Scripts Guide

Complete reference for all npm scripts in WPStarter.

## Table of Contents
1. [Development Scripts](#development-scripts)
2. [Build Scripts](#build-scripts)
3. [WordPress Scripts](#wordpress-scripts)
4. [Code Quality Scripts](#code-quality-scripts)
5. [Workflow Examples](#workflow-examples)
6. [Troubleshooting](#troubleshooting)

---

## Development Scripts

### `npm run dev`
**Start Vite development server with HMR**

```bash
npm run dev
```

**What it does:**
- Starts Vite dev server on `localhost:3000`
- Enables Hot Module Replacement (HMR) for instant updates
- Watches for PHP file changes and triggers live reload
- Outputs to `./build/wordpress/wp-content/themes/THEME_NAME`
- Generates source maps for debugging

**When to use:**
- Daily theme development
- Making CSS/JS changes
- Testing changes in real-time

**Note:** This does NOT start WordPress. You need a local PHP/MySQL server running WordPress separately.

---

### `npm run preview`
**Preview production build locally**

```bash
npm run build
npm run preview
```

**What it does:**
- Serves the production build locally
- Mimics production environment
- Tests minified assets

**When to use:**
- Before deploying to production
- Testing optimized build
- Checking bundle sizes

---

## Build Scripts

### `npm run build`
**Build optimized assets with Vite**

```bash
npm run build
```

**What it does:**
- Compiles JS/JSX with Babel
- Processes SCSS to CSS
- Runs PostCSS (Autoprefixer, preset-env)
- Minifies CSS and JS
- Tree-shakes unused code
- Generates production source maps
- Outputs to `./build/wordpress/wp-content/themes/THEME_NAME`

**Outputs:**
- `style.css` - Main stylesheet
- `js/main.js` - Main JavaScript bundle
- `js/*.js` - Code-split chunks
- `img/*` - Processed images
- `fonts/*` - Font files

**When to use:**
- Before running `npm run prod`
- Testing production build locally
- CI/CD pipelines

---

### `npm run prod`
**Complete production build workflow**

```bash
npm run prod
```

**What it does:**
1. Runs `npm run build` (Vite optimization)
2. Runs `gulp prod`:
   - Cleans `./dist` directory
   - Copies theme PHP files
   - Copies Vite-built assets (JS/CSS)
   - Optimizes images with Sharp
   - Converts images to WebP (if enabled)
   - Copies fonts
   - Copies custom plugins
   - Creates `./backups/THEME_NAME-TIMESTAMP.zip`

**Output:**
- Production-ready zip file in `./backups/`
- Ready to upload to WordPress

**When to use:**
- Deploying to production
- Creating theme package for distribution
- Final QA testing

---

### `npm run clean`
**Remove build artifacts**

```bash
npm run clean
```

**What it does:**
- Deletes `./dist` directory
- Removes old build files

**When to use:**
- Before fresh production build
- Cleaning up disk space
- Troubleshooting build issues

---

## WordPress Scripts

### `npm run wpinstall`
**Install WordPress from scratch**

```bash
npm run wpinstall
```

**What it does:**
1. Downloads latest WordPress
2. Creates database (from config)
3. Installs and configures WordPress
4. Sets up admin user
5. Installs configured plugins
6. Activates theme

**Requirements:**
- `.env` file configured
- MySQL running
- wp-cli installed

**When to use:**
- First-time setup
- Creating fresh dev environment
- After cloning repository

---

### `npm run wpbackup`
**Backup WordPress database and content**

```bash
npm run wpbackup
```

**What it does:**
- Creates SQL dump of database
- Zips wp-content directory
- Saves to `./backups/` with timestamp

**When to use:**
- Before major changes
- Regular backups
- Before WordPress updates

---

### `npm run wprestore`
**Restore WordPress from backup**

```bash
npm run wprestore
```

**What it does:**
- Lists available backups
- Prompts for selection
- Restores database from SQL
- Restores wp-content files

**When to use:**
- After breaking changes
- Rolling back updates
- Moving between environments

---

## Code Quality Scripts

### `npm run lint`
**Run all linters**

```bash
npm run lint
```

**What it does:**
- Runs `lint:js` (ESLint)
- Runs `lint:css` (Stylelint)
- Reports all errors

**When to use:**
- Before committing code
- In CI/CD pipelines
- Code review preparation

---

### `npm run lint:js`
**Lint JavaScript files**

```bash
npm run lint:js
```

**What it does:**
- Checks all `.js` and `.jsx` files in `src/`
- Reports ESLint errors and warnings
- Checks Prettier formatting

**Checks:**
- Code style (Airbnb base)
- WordPress standards
- Prettier formatting
- Best practices

---

### `npm run lint:js:fix`
**Lint and auto-fix JavaScript**

```bash
npm run lint:js:fix
```

**What it does:**
- Runs ESLint with `--fix` flag
- Auto-fixes fixable issues
- Reports remaining errors

**Fixes:**
- Formatting issues
- Import order
- Spacing/indentation
- Simple rule violations

---

### `npm run lint:css`
**Lint CSS/SCSS files**

```bash
npm run lint:css
```

**What it does:**
- Checks all `.css` and `.scss` files in `src/`
- Reports Stylelint errors
- Validates SCSS syntax

**Checks:**
- SCSS best practices
- Property order
- Selector naming
- Color format consistency

---

### `npm run lint:css:fix`
**Lint and auto-fix CSS/SCSS**

```bash
npm run lint:css:fix
```

**What it does:**
- Runs Stylelint with `--fix` flag
- Auto-fixes fixable issues
- Reports remaining errors

---

### `npm run format`
**Format all source files**

```bash
npm run format
```

**What it does:**
- Formats all JS, JSX, SCSS, CSS, JSON, PHP files
- Applies Prettier configuration
- Writes changes to files

**When to use:**
- Before committing
- After bulk changes
- Standardizing code style

---

### `npm run format:check`
**Check if files are formatted**

```bash
npm run format:check
```

**What it does:**
- Checks formatting without modifying files
- Exits with error if any files need formatting
- Perfect for CI/CD

**When to use:**
- In pre-commit hooks
- CI/CD pipelines
- Validating PR formatting

---

### `npm run validate`
**Complete validation workflow**

```bash
npm run validate
```

**What it does:**
1. Checks formatting (`format:check`)
2. Runs all linters (`lint`)
3. Runs production build (`build`)

**When to use:**
- Before pushing to repository
- In CI/CD pipelines
- Pre-deployment checks

**Note:** This can take a few minutes. Use for thorough checks, not rapid iteration.

---

## Workflow Examples

### Daily Development Workflow

```bash
# Morning: Start development
npm run dev

# ... make changes, see instant updates ...

# Before lunch: Save work
git add .
git commit -m "Add feature X"
```

### Pre-Commit Workflow

```bash
# Format code
npm run format

# Check for issues
npm run lint

# Commit if all pass
git commit -m "Your message"
```

### Production Deployment

```bash
# 1. Validate everything
npm run validate

# 2. Create production package
npm run prod

# 3. Upload zip from ./backups/ to WordPress
```

### Creating Fresh Dev Environment

```bash
# 1. Clone and install
git clone <repo>
cd wpstarter
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your settings

# 3. Install WordPress
npm run wpinstall

# 4. Start developing
npm run dev
```

### Backing Up Before Major Changes

```bash
# 1. Create backup
npm run wpbackup

# 2. Make your changes
# ... development work ...

# 3. If things go wrong
npm run wprestore
```

---

## Troubleshooting

### "npm run dev" port already in use

**Problem:** Port 3000 is taken

**Solution:**
```bash
# Vite will automatically try next port
# Or specify custom port in vite.config.js:
server: { port: 3001 }
```

### "npm run prod" fails with "cannot find build"

**Problem:** Vite hasn't built yet

**Solution:**
```bash
# Run build first
npm run build

# Then run prod
gulp prod
```

### Linting fails on valid code

**Problem:** ESLint/Prettier conflict

**Solution:**
```bash
# Format first, then lint
npm run format
npm run lint
```

### "Module not found" errors

**Problem:** Dependencies not installed

**Solution:**
```bash
# Clean install
rm -rf node_modules package-lock.json
npm install
```

### Build is slow

**Optimization tips:**
- Vite dev server is fast; only use `build` when needed
- Use `dev` for development (HMR is instant)
- Only run `prod` for final deployment

### Images not optimizing

**Problem:** Sharp installation failed

**Solution:**
```bash
# Reinstall sharp
npm install sharp --save-dev

# Or skip image optimization
# Comment out img task in gulpfile
```

---

## Script Dependencies

Understanding what depends on what:

```
prod
├── build (Vite)
└── gulp prod
    ├── clean
    ├── theme (copies PHP)
    ├── vite-assets (copies Vite output)
    ├── img (optimizes images)
    ├── fonts (copies fonts)
    ├── plugins (copies plugins)
    └── zip (creates package)

validate
├── format:check
├── lint
│   ├── lint:js
│   └── lint:css
└── build

dev → vite (independent, runs continuously)
```

---

## Environment Variables

Scripts use these environment variables (from `.env`):

- `SITE_THEME_NAME` - Theme directory name
- `DB_NAME`, `DB_USER`, `DB_PASSWORD` - Database config
- `WPSTARTER_WEBP_SUPPORT` - Enable WebP conversion

---

## Performance Tips

1. **Use `dev` for development** - It's 10-50x faster than rebuilding
2. **Run `build` only when needed** - Before production or testing
3. **Use `lint:*:fix` to auto-fix** - Faster than manual fixes
4. **Format before linting** - Prettier fixes many lint issues
5. **Run `validate` in CI only** - Too slow for local iteration

---

## Integration with Other Tools

### Git Hooks (Future)
```bash
# Pre-commit hook
npm run format
npm run lint
```

### CI/CD
```bash
# GitHub Actions / GitLab CI
npm ci  # Faster than npm install
npm run validate
npm run prod
```

### IDEs
- **VSCode:** Install ESLint and Prettier extensions
- **Enable:** Format on Save
- **Configure:** Use workspace settings

---

## Quick Reference

| Task | Command | Speed | When to Use |
|------|---------|-------|-------------|
| Daily dev | `npm run dev` | ⚡ Instant | Always |
| Format code | `npm run format` | ⚡ Fast | Before commit |
| Check lint | `npm run lint` | ⚡ Fast | Before commit |
| Fix lint | `npm run lint:*:fix` | ⚡ Fast | Auto-fix issues |
| Build for test | `npm run build` | 🕐 Moderate | Testing prod build |
| Full production | `npm run prod` | 🕐 Slow | Deployment |
| Validate all | `npm run validate` | 🕐 Very Slow | CI/CD, major changes |

---

## What Changed from Old Scripts

### Before (Gulp-based)
```json
"dev": "gulp dev"  // Slow, rebuilds everything
```

### After (Vite-based)
```json
"dev": "vite"  // Fast, HMR, incremental
```

### Key Improvements
- ✅ 10-50x faster development builds
- ✅ Hot Module Replacement (instant updates)
- ✅ Better source maps
- ✅ Tree-shaking and code splitting
- ✅ Modern ES modules
- ✅ Optimized production builds
- ✅ Separated linting scripts
- ✅ Auto-fix capabilities

---

## Need Help?

- **Vite Issues:** Check [Vite Documentation](https://vitejs.dev/)
- **WordPress Issues:** See `WORDPRESS_FEATURES.md`
- **General Setup:** See `README.md`
- **Report Bugs:** [GitHub Issues](https://github.com/msteinerweb/wpstarter/issues)

---

**Last Updated:** 2024
**For:** WPStarter v0.0.8+
