const config = require('../../../config');
const execa = require('execa');
const path = require('path');

const wppath = path.join(__dirname, '../../../build/wordpress');
const execOptions = { cwd: wppath, };

async function installPlugins() {

    const pluginCommands = [];

    for (const plugin of config.plugins) {
        pluginCommands.push(execa('wp', ['plugin', 'install', plugin, '--activate'], execOptions));
    }

    await Promise.all(pluginCommands);

}

module.exports = installPlugins;
