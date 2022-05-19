const { site } = require('../../../config');
const { src, dest } = require('gulp');
const gulpzip = require('gulp-zip');

function zip() {
    return src(`./dist/themes/${site.theme_name}/**/*`)
        .pipe(gulpzip(`${site.theme_name}.zip`))
        .pipe(dest(`./dist`));
}

module.exports = zip;
