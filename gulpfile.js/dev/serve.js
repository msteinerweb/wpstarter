const { watch, series } = require('gulp');
const browserSync = require('browser-sync');
const path = require('path');
const PhpDevelopmentServerConnection = require('../util/phpconnect');

const { site } = require('../../config');

const css = require('./css');
const javascript = require('./javascript');
const img = require('./img');
const fonts = require('./fonts');
const theme = require('./theme');
const plugins = require('./plugins');


function devServer() {

    // create a new server
    const server = new PhpDevelopmentServerConnection({
        base: './build/wordpress',
        port: 3020,
        bin: 'php', // 'php7.2' for example
        ini: path.join(__dirname, '../../../php.ini'),
        logErrorsOnly: true,
    });

    // start the server
    server.server(() => {
        browserSync({
            logPrefix: `🚀 ${site.title}`,
            proxy: '127.0.0.1:3020',
            port: '3010',
            open: 'local',
            ghostMode: false,
        });
    });

    // watch for changes to files and reload the browser when changes are detected
    watch('./src/assets/scss/**/*.scss', css);
    watch('./src/assets/js/**', series(javascript, reload));
    watch('./src/assets/img/**', series(img, reload));
    watch('./src/assets/fonts/**', series(fonts, reload));
    watch('./src/theme/**', series(theme, reload));
    watch('./src/plugins/**', series(plugins, reload));
    watch('./build/wordpress/**/*.php', reload);
}

function reload(done) {
    browserSync.reload();
    done();
}

module.exports = devServer;
