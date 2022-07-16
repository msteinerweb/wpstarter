const execa = require('execa');
const fs = require('fs');
const path = require('path');

const wppath = path.join(__dirname, '../../build/wordpress');
const execOptions = { cwd: wppath, };

async function downloadWordPress() {
    fs.mkdirSync('./build/');
    fs.mkdirSync('./build/wordpress');
    await execa('wp', ['core', 'download'], execOptions);
}

module.exports = downloadWordPress;
