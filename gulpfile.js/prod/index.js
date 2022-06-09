const { series } = require('gulp');

const clean = require('./clean');
const theme = require('./theme');
const css = require('./css');
const javascript = require('./javascript');
const img = require('./img');
const fonts = require('./fonts');
const plugins = require('./plugins');
const zip = require('./zip');


module.exports = series([
    clean,
    theme,
    css,
    javascript,
    img,
    fonts,
    plugins,
    zip,
]);
