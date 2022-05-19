const { series } = require('gulp');

const cleanup = require('./cleanup');
const downloadWordPress = require('./downloadWordPress');
const devtheme = require('../dev/theme');
const devcss = require('../dev/css');
const createDatabase = require('./createDatabase');
const setupWordPress = require('./setupWordPress');


module.exports = series([
    cleanup,
    downloadWordPress,
    devtheme,
    devcss,
    createDatabase,
    setupWordPress,
]);
