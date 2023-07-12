const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const dart = require('dart-sass');
const sourcemaps = require('gulp-sourcemaps');
const gulpHeader = require('gulp-header');
const browserSync = require('browser-sync');
const gulpReplace = require('gulp-replace');
const timeToVersion = require('../util/timeToVersion');

const { site, themeComment } = require('../../config');

sass.compiler = dart;

async function css() {
    return await src('./src/assets/scss/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            includePaths: 'node_modules',
        }).on('error', sass.logError))
        .pipe(gulpHeader(themeComment))
        .pipe(gulpReplace('{{VERSION}}', timeToVersion()))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`./build/wordpress/wp-content/themes/${site.theme_name}`))
        .pipe(browserSync.stream({ match: '**/*.css' }));
}


module.exports = css;
