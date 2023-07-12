const { dest, src, parallel } = require('gulp');
const webp = require('gulp-webp');
const { site, wpstarter } = require('../../config');

function img2webp() {
    return src('./src/assets/img/**')
        .pipe(webp())
        .pipe(dest(`./build/wordpress/wp-content/themes/${site.theme_name}/img`));
}

function img() {
    return src('./src/assets/img/**')
        .pipe(dest(`./build/wordpress/wp-content/themes/${site.theme_name}/img`));
}

module.exports = parallel([
    img,
    wpstarter.webp_support ? img2webp : () => {},
]);
