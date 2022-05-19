const { src, dest } = require('gulp');
const { site } = require("../../../config");


function fonts() {
    return src('./src/assets/fonts/**').pipe(
        dest(`./dist/themes/${site.theme_name}/fonts`),
    );
}

module.exports = fonts;
