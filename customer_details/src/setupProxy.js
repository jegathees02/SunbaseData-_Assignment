// const { createProxyMiddleware } = require('http-proxy-middleware');

// module.exports = function (app) {
//   app.use(
//     '/sunbase', // Your API base path
//     createProxyMiddleware({
//       target: 'https://qa2.sunbasedata.com',
//       changeOrigin: true,
//     })
//   );
// };

const { createProxyMiddleware } = require('http-proxy-middleware')

module.exports = function (app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://qa2.sunbasedata.com',
      changeOrigin: true,
    }),
  )
}
