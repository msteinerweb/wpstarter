const fs = require('fs-extra');

async function wpContent() {
    await fs.copy('./build/wordpress/wp-content', './content/wp-content');
}

module.exports = wpContent;
