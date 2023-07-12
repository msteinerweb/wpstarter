const { dest, src, parallel } = require('gulp');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');

const { site, wpstarter } = require('../../config');

function img2webp() {
    return src('./src/assets/img/**')
        .pipe(imagemin([imagemin.svgo({ plugins: [{ removeViewBox: true }] })], { verbose: true }))
        .pipe(webp())
        .pipe(dest(`./dist/themes/${site.theme_name}/img`));
}

function img() {
    return src('./src/assets/img/**')
        .pipe(imagemin([imagemin.svgo({ plugins: [{ removeViewBox: true }] })], { verbose: true }))
        .pipe(dest(`./dist/themes/${site.theme_name}/img`));
}

module.exports = parallel([
    img,
    wpstarter.webp_support ? img2webp : () => {},
]);
