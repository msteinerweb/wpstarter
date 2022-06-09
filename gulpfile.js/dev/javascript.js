const { site } = require('../../config');
const { dest } = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');


function javascript() {

    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(sourcemaps.init())
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(concat('main.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(dest(`./build/wordpress/wp-content/themes/${site.theme_name}/js`));
}

module.exports = javascript;
