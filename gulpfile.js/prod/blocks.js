const { src, dest } = require('gulp');
const babel = require('gulp-babel');
const { site } = require('../../config');

const babelConfig = {
    presets: ['@babel/preset-env', '@babel/preset-react'],
    plugins: ['@babel/plugin-transform-modules-commonjs'],
};

function compileJSX() {
    return src('src/blocks/**/*.jsx')
        .pipe(babel(babelConfig))
        .pipe(dest(`./dist/themes/${site.theme_name}/blocks`));
}

module.exports = compileJSX;
