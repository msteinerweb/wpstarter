
const config = {}


config.site = {}
config.site.title = 'Website Title';
config.site.blogdescription = 'Just another WordPress site';
config.site.theme_name = 'WPStarter';
config.site.admin_user = 'admin';
config.site.admin_password = '123456789';
config.site.admin_email = 'info@example.com';


config.database = {};
config.database.dbname = 'test';
config.database.dbuser = 'root';
config.database.dbpass = '123456789';
config.database.dbhost = 'localhost';
config.database.dbprefix = 'wp_';


config.options = {};
config.options.timezone_string = 'America/Chicago';
config.options.start_of_week = 0;


// plugins that will be installed
config.plugins = [
];


module.exports = config;
