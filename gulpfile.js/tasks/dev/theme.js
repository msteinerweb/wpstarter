const { site } = require("../../../config");
const { src, dest } = require('gulp');
const fs = require('fs');


function theme() {
    if (!fs.existsSync('./build')) {
        log(buildNotFound);
        process.exit(1);
    } else {
        return src('./src/theme/**').pipe(dest(`./build/wordpress/wp-content/themes/${site.theme_name}`));
    }
}


module.exports = theme;
