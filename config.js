
const config = {};

config.site = {};
config.site.title = 'Website Title';
config.site.blogdescription = 'Just another WordPress site';
config.site.theme_name = 'WPStarter';
config.site.admin_user = 'admin';
config.site.admin_password = '123456789';
config.site.admin_email = 'info@example.com';


config.wpstarter = {};
config.wpstarter.webp_support = true;
config.wpstarter.phpbin = 'php';


config.database = {};
config.database.dbname = 'wordpress';
config.database.dbuser = 'wordpress';
config.database.dbpass = 'wordpress';
config.database.dbhost = 'db';
config.database.dbprefix = 'wp_';


config.options = {};
config.options.timezone_string = 'America/Chicago';
config.options.start_of_week = 0;


// plugins that will be installed
config.plugins = [
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
