const path = require("path");

module.exports = {
  webpack: {
    alias: {
      "~": path.resolve(__dirname, "src"),
    },
    // node: {
    //   fs: 'empty',
    // },
  },
  // disabled console.log in production
  // babel: {
  //   plugins:
  //     process.env.NODE_ENV === 'production'
  //       ? [['transform-remove-console', { exclude: ['error'] }]]
  //       : [],
  // },
};
