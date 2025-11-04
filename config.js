// Load environment variables from .env file
require('dotenv').config();

const config = {};

config.site = {};
config.site.title = process.env.SITE_TITLE || 'Website Title';
config.site.blogdescription = process.env.SITE_DESCRIPTION || 'Just another WordPress site';
config.site.theme_name = process.env.SITE_THEME_NAME || 'WPStarter';
config.site.admin_user = process.env.SITE_ADMIN_USER || 'admin';
config.site.admin_password = process.env.SITE_ADMIN_PASSWORD || '123456789';
config.site.admin_email = process.env.SITE_ADMIN_EMAIL || 'info@example.com';

config.wpstarter = {};
config.wpstarter.webp_support =
    process.env.WPSTARTER_WEBP_SUPPORT === 'true' ||
    process.env.WPSTARTER_WEBP_SUPPORT === undefined;
config.wpstarter.phpbin = process.env.WPSTARTER_PHP_BIN || 'php'; // path to php binary

config.database = {};
config.database.dbname = process.env.DB_NAME || 'test';
config.database.dbuser = process.env.DB_USER || 'root';
config.database.dbpass = process.env.DB_PASSWORD || '123456789';
config.database.dbhost = process.env.DB_HOST || 'localhost';
config.database.dbprefix = process.env.DB_PREFIX || 'wp_';

config.options = {};
config.options.timezone_string = process.env.WP_TIMEZONE || 'America/Chicago';
config.options.start_of_week = parseInt(process.env.WP_START_OF_WEEK || '0', 10);

// plugins that will be installed
const pluginsEnv = process.env.WP_PLUGINS || '';
config.plugins = pluginsEnv
    ? pluginsEnv.split(',').map(p => p.trim())
    : [
          // 'wpforms-lite',
          // 'wordpress-seo',
          // 'all-in-one-wp-migration',
          // 'user-switching',
      ];


// more info can be found here: https://developer.wordpress.org/themes/basics/main-stylesheet-style-css/
config.themeComment = `
/*
Theme Name: ${config.site.theme_name}
Description: Built using WPStarter
Version: {{VERSION}}
*/
`;


module.exports = config;
