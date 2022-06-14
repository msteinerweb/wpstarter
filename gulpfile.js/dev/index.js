const { series } = require('gulp');

const theme = require('./theme');
const css = require('./css');
const javascript = require('./javascript');
const img = require('./img');
const fonts = require('./fonts');
const plugins = require('./plugins');
const serve = require('./serve');


module.exports = series([
    theme,
    css,
    javascript,
    img,
    fonts,
    plugins,
    serve,
]);
