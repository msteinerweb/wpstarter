const { site } = require('../../config');
const { dest, src } = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');

function javascript() {
    return src('./src/assets/js/main.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['@babel/preset-env'],

        }))
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`./build/wordpress/wp-content/themes/${site.theme_name}/js`));
}


module.exports = javascript;
