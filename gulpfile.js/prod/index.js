const { series } = require('gulp');

const clean = require('./clean');
const theme = require('./theme');
const viteAssets = require('./vite-assets');
const img = require('./img');
const fonts = require('./fonts');
const plugins = require('./plugins');
const zip = require('./zip');

/**
 * Production build workflow
 *
 * Note: This expects Vite to have already run (via npm run build)
 * It copies Vite's optimized output instead of rebuilding with old tools
 *
 * Steps:
 * 1. clean - Remove old dist directory
 * 2. theme - Copy theme PHP files
 * 3. viteAssets - Copy Vite-built JS/CSS (replaces old css + javascript tasks)
 * 4. img - Optimize images
 * 5. fonts - Copy fonts
 * 6. plugins - Copy custom plugins
 * 7. zip - Create production package
 */
module.exports = series([
    clean,
    theme,
    viteAssets,
    img,
    fonts,
    plugins,
    zip,
]);
