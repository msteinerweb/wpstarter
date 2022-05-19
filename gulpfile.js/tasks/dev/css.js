const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const dart = require('dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpHeader = require('gulp-header');
const browserSync = require('browser-sync');
const { site } = require('../../../config');

sass.compiler = dart;

// more info can be found here:
// https://developer.wordpress.org/themes/basics/main-stylesheet-style-css/
const themeComment = `/*
Theme Name: ${site.theme_name}
Description: Built using WPStarter
*/
`;


async function css() {
    return await src('./src/assets/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: 'node_modules',
        }))
        .pipe(sourcemaps.write('.'))
        .pipe(gulpHeader(themeComment))
        .pipe(dest(`./build/wordpress/wp-content/themes/${site.theme_name}`))
        .pipe(browserSync.stream({ match: '**/*.css' }));
}

module.exports = css;
