const { site } = require('../../config');
const { dest } = require('gulp');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const buffer = require('vinyl-buffer');


function javascript() {
    const b = browserify({
        entries: './src/assets/js/main.js',
        debug: true,
        transform: [['babelify', { presets: ['@babel/preset-env'] }]],
    });

    return b
        .bundle()
        .pipe(source('main.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`./build/wordpress/wp-content/themes/${site.theme_name}/js`));
}

module.exports = javascript;
