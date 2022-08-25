const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
});

module.exports = {
  configureWebpack: {
    resolve: {
      // modules: ['node_modules'],
      // extensions: ['.ts', '.js'],
      fallback: {
        //Fixes issue with Webpack >5 where Crypto build was failing.
        buffer: require.resolve("buffer/"),
        crypto: require.resolve("crypto-browserify"),
        stream: require.resolve("stream-browserify"),
      },
    },

    plugins: [
      new webpack.ProvidePlugin({
        Buffer: ["buffer", "Buffer"],
      }),
    ],

    devServer: {
      allowedHosts: ["dev.reveal.health", "reveal.health"],
    },
  },
};
