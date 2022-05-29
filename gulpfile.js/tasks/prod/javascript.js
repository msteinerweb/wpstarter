const { site } = require('../../../config');
const { dest } = require('gulp');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const ts = require('gulp-typescript');
const tsProject = ts.createProject('tsconfig.json');


function javascript() {
    return tsProject.src()
        .pipe(tsProject())
        .js
        .pipe(babel({ presets: ['@babel/preset-env'] }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(dest(`./dist/themes/${site.theme_name}/js`));
}

module.exports = javascript;
