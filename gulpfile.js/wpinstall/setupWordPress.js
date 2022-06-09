const config = require('../../config');
const execa = require('execa');
const path = require('path');


const url = 'http://127.0.0.1:3020';


const wppath = path.join(__dirname, '../../../build/wordpress');
const execOptions = { cwd: wppath, };

async function setupWordPress() {

    // WordPress install
    await execa('wp', ['config', 'create', `--dbname=${config.database.dbname}`, `--dbuser=${config.database.dbuser}`, `--dbpass=${config.database.dbpass}`, `--dbhost=${config.database.dbhost}`, '--extra-php=define( \'DISABLE_WP_CRON\', true );'], execOptions);
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

};

module.exports = setupWordPress;
