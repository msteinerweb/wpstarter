const { src, dest } = require('gulp');

function plugins() {
    return src(['./src/plugins/**', '!./src/plugins/README.md']).pipe(
        dest('./dist/plugins')
    );
}

module.exports = plugins;
