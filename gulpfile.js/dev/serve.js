const { site } = require('../../config');
const { watch, series } = require('gulp');
const connect = require('gulp-connect-php');
const browserSync = require('browser-sync');


const css = require('./css');
const javascript = require('./javascript');
const img = require('./img');
const fonts = require('./fonts');
const theme = require('./theme');
const plugins = require('./plugins');

function devServer() {
    connect.server({
        base: './build/wordpress',
        port: '3020',
    },
        () => {
            browserSync({
                logPrefix: `🚀 ${site.title}`,
                proxy: '127.0.0.1:3020',
                port: '3010',
                open: 'external',
            });
        },
    );

    watch('./src/assets/scss/**/*.scss', css);
    watch('./src/assets/ts/**', series(javascript, reload));
    watch('./src/assets/img/**', series(img, reload));
    watch('./src/assets/fonts/**', series(fonts, reload));
    watch('./src/theme/**', series(theme, reload));
    watch('./src/plugins/**', series(plugins, reload));
}


function reload(done) {
    browserSync.reload();
    done();
}


module.exports = devServer;
