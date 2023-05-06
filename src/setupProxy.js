const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/local',
        createProxyMiddleware({
            target: 'http://localhost:3001/',
            changeOrigin: true,
            pathRewrite: { '/local': '' },
        })
    );

    // app.use(
    //     '/heroku',
    //     createProxyMiddleware({
    //         target: 'https://londoner.herokuapp.com/',
    //         changeOrigin: true,
    //         pathRewrite: { '/heroku': '' },
    //     })
    // );
};
