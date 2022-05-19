const { site } = require("../../../config");
const { src, dest } = require('gulp');

function theme() {
    return src(['./src/theme/**', '!./src/theme/**/node_modules/**']).pipe(
        dest(`./dist/themes/${site.theme_name}`),
    );
}

module.exports = theme;
