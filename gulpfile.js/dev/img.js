const { dest, src } = require('gulp');

const { site } = require('../../config');

function img() {
    return src('./src/assets/img/**')
        .pipe(dest(`./build/wordpress/wp-content/themes/${site.theme_name}/img`));
}


module.exports = img;
