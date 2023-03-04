const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/utravel',
        createProxyMiddleware({
            target: 'https://utravel.liontravel.com/',
            changeOrigin: true,
            pathRewrite: { '/utravel': '' },
        })
    );
};
