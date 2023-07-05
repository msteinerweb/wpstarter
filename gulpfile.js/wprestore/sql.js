const execa = require('execa');
const path = require('path');

const wppath = path.join(__dirname, '../../build/wordpress');
const execOptions = { cwd: wppath, };

async function sql() {
    await execa('wp', ['db', 'import', '../../content/database.sql'], execOptions);
}

module.exports = sql;
