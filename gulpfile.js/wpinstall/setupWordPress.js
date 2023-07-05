const config = require('../../config');
const execa = require('execa');
const path = require('path');


const url = 'http://127.0.0.1:3020';


const wppath = path.join(__dirname, '../../build/wordpress');
const execOptions = { cwd: wppath, };

async function setupWordPress() {


    // create wp-config.php
    await execa('wp', ['config', 'create', `--dbname=${config.database.dbname}`, `--dbuser=${config.database.dbuser}`, `--dbpass=${config.database.dbpass}`, `--dbhost=${config.database.dbhost}`, '--extra-php=define( \'DISABLE_WP_CRON\', true );'], execOptions);


    // check if WordPress is installed
    let isInstalled;


    try {
        await execa('wp', ['core', 'is-installed'], execOptions);
        isInstalled = true;
    } catch (err) {
        // The 'wp core is-installed' command will exit with code 1 and throw an error if WordPress
        // isn't installed, so in that case we set isInstalled to false.
        isInstalled = false;
    }

    // If WordPress is not installed then execute the setup
    if (!isInstalled) {

        // set up WordPress
        await execa('wp', ['core', 'install', `--url=${url}`, `--title=${config.site.title}`, `--admin_user=${config.site.admin_user}`, `--admin_password=${config.site.admin_password}`, `--admin_email=${config.site.admin_email}`, '--skip-email'], execOptions);

        // set options
        await execa('wp', ['option', 'update', 'blogdescription', config.site.blogdescription], execOptions);
        await execa('wp', ['option', 'update', 'timezone_string', config.options.timezone_string], execOptions);
        await execa('wp', ['option', 'update', 'start_of_week', config.options.start_of_week], execOptions);
        await execa('wp', ['option', 'update', 'siteurl', `${url}`], execOptions);
        await execa('wp', ['option', 'update', 'home', `${url}`], execOptions);

        // fix permalink
        await execa('wp', ['rewrite', 'structure', '/%postname%/'], execOptions);

        // set plugins
        await execa('wp', ['plugin', 'uninstall', '--all', '--deactivate'], execOptions);

        const pluginCommands = [];
        for (const plugin of config.plugins) {
            pluginCommands.push(await execa('wp', ['plugin', 'install', plugin, '--activate'], execOptions));
        }
        await Promise.all(pluginCommands);


        // remove default posts
        await execa('wp', ['post', 'delete', 1, 2, 3, '--force'], execOptions);

        // set our theme and get rid of the other default themes
        await execa('wp', ['theme', 'activate', config.site.theme_name], execOptions);
        await execa('wp', ['theme', 'uninstall', '--all'], execOptions);
    } else {
        console.log('WordPress is already installed. Skipping setup.');
    }

};

module.exports = setupWordPress;
