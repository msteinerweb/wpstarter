const { site, themeComment } = require('../../config');
const { src, dest } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const dart = require('dart-sass');
const gulpHeader = require('gulp-header');
const gulpReplace = require('gulp-replace');
const timeToVersion = require("../util/timeToVersion");

sass.compiler = dart;


function css() {
    return src('./src/assets/scss/style.scss')
        .pipe(sass({ includePaths: 'node_modules' }))
        .pipe(gulpHeader(themeComment))
        .pipe(gulpReplace('{{VERSION}}', timeToVersion()))
        .pipe(dest(`./dist/themes/${site.theme_name}`))
}

module.exports = css;
