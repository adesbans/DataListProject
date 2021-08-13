module.exports = {
    publicPath: './',
    devServer: {
        proxy: {
            '^/api': {
                // local (dev) server
                target: 'http://localhost:3000',
                // remote (production) server so it can be tested before pushing to Gitlab
                // "target": "https://compsci290-mashup-example.herokuapp.com/",
                changeOrigin: true,
            },
        },
    },
};
