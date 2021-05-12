const withSass = require('@zeit/next-sass');
const withCss = require('@zeit/next-css');
module.exports = withSass(withCss({
  cssModules: false,
  cssLoaderOptions: {
    importLoaders: 1,
    localIdentName: "[local]___[hash:base64:5]",
  },
  //target: 'serverless'
}));