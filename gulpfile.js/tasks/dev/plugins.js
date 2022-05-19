const { src, dest } = require('gulp');

function plugins() {
    return src(['./src/plugins/**', '!./src/plugins/README.md']).pipe(
        dest('./build/wordpress/wp-content/plugins'),
    );
}

module.exports = plugins;
