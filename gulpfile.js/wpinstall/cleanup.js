const del = require('del');
const fs = require('fs');

async function cleanup() {

    // clean old WordPress install files
    await del(['./build']);
    await del(['./dist']);

    // if .git/config exists and remote is wpstarter, delete git
    if (fs.existsSync('./.git/config')) {
        const gitConfig = fs.readFileSync('./.git/config', 'utf8');
        if (gitConfig.includes('git@github.com:msteinerweb/wpstarter.git')) {
            await del(['./.git']);
        }
    }

    // loop through and delete all .gitkeep files, ignore node_modules
    await del(['./**/.gitkeep', '!./node_modules/**']);
}

module.exports = cleanup;
