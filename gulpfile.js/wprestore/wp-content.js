const fs = require('fs-extra');

async function wpContent() {

    // delete the original wp-content folder first
    await fs.remove('./build/wordpress/wp-content');

    // copy the wp-content folder from the build folder to the src folder
    await fs.copy('./content/wp-content', './build/wordpress/wp-content');
}

module.exports = wpContent;
