const { src, dest } = require('gulp');
const { site } = require('../../config');


async function fonts() {
    return await src('./src/assets/fonts/**').pipe(
        dest(`./build/wordpress/wp-content/themes/${site.theme_name}/fonts`),
    );
}


module.exports = fonts;
