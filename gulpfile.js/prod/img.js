const { site } = require('../../config');
const { dest, src } = require('gulp');
const imagemin = require('gulp-imagemin');

function img() {
    return src('./src/assets/img/**')
    .pipe(
        imagemin([imagemin.svgo({ plugins: [{ removeViewBox: true }] })], {
            verbose: true,
        }),
    )
    .pipe(dest(`./dist/themes/${site.theme_name}/img`),);
}


module.exports = img;
