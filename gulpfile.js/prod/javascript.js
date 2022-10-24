const { site } = require('../../config');
const { dest, src } = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function javascript() {
    return src('./src/assets/js/main.js')
        .pipe(babel({
            presets: ['@babel/preset-env'],

        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest(`./dist/themes/${site.theme_name}/js`));
}


module.exports = javascript;
