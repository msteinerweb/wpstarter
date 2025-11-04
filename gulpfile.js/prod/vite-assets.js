/**
 * Copy Vite-built assets from build directory to dist directory
 * This replaces the old css and javascript gulp tasks
 */
const { src, dest } = require('gulp');
const { site } = require('../../config');

function viteAssets() {
    const buildPath = `./build/wordpress/wp-content/themes/${site.theme_name}`;
    const distPath = `./dist/themes/${site.theme_name}`;

    return src([
        `${buildPath}/**/*.js`,
        `${buildPath}/**/*.css`,
        `${buildPath}/**/*.map`,
        `${buildPath}/.vite/**`, // Vite manifest
    ], { base: buildPath })
        .pipe(dest(distPath));
}

module.exports = viteAssets;
