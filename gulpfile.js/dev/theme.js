const { site } = require("../../config");
const { src, dest } = require('gulp');
const fs = require('fs');


function theme() {
    if (!fs.existsSync('./build')) {
        console.log(' ❌ - You need to install WordPress first. Run the command: $ npm run wpinstall');
        process.exit(1);
    } else {
        return src('./src/theme/**').pipe(dest(`./build/wordpress/wp-content/themes/${site.theme_name}`));
    }
}


module.exports = theme;
