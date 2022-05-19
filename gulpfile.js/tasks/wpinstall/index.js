const { series } = require('gulp');

const cleanup = require('./cleanup');
const downloadWordPress = require('./downloadWordPress');
const createDatabase = require('./createDatabase');
const setupWordPress = require('./setupWordPress');
const installPlugins = require('./installPlugins');

module.exports = series([
    cleanup,
    downloadWordPress,
    createDatabase,
    setupWordPress,
    installPlugins,
])
