// https://marcobotto.com/blog/compiling-and-bundling-typescript-libraries-with-webpack/

// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/kateApp.ts",
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        //exclude: /node_modules/
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
        "child_process": false
    }
  },
  output: {
    filename: "kateApp.js",
    path: path.resolve(__dirname, "js")
  }
};
