const { site } = require('../../config');
const { dest } = require('gulp');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

function javascript() {

    const b = browserify({
        entries: './src/assets/js/main.js',
        debug: false,
        transform: [['babelify', { presets: ['@babel/preset-env'] }]],
    });

    return b
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest(`./dist/themes/${site.theme_name}/js`));
}


module.exports = javascript;
