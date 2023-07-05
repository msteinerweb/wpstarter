const { series } = require('gulp');

const wpContent = require('./wp-content');
const sql = require('./sql');

module.exports = series([
    wpContent,
    sql,
]);
