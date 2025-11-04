module.exports = {
    plugins: {
        autoprefixer: {
            overrideBrowserslist: ['> 1%', 'last 2 versions', 'not dead'],
        },
        'postcss-preset-env': {
            stage: 3,
            features: {
                'nesting-rules': true,
                'custom-properties': true,
            },
        },
    },
};
