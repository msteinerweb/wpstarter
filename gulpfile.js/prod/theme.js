const { src, dest } = require('gulp');
const gulpReplace = require('gulp-replace');
const timeToVersion = require('../util/timeToVersion');

const { site } = require('../../config');

function theme() {
    return src(['./src/theme/**', '!./src/theme/**/node_modules/**'])
        .pipe(gulpReplace('{{VERSION}}', timeToVersion()))
        .pipe(dest(`./dist/themes/${site.theme_name}`));
}


module.exports = theme;
