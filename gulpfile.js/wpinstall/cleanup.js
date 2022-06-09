const del = require('del');

async function cleanup() {
    await del(['./build']);
    await del(['./dist']);
}

module.exports = cleanup;
