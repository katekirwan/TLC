// webpack.config.js
const path = require("path");

module.exports = {
  entry: "./src/app.ts",
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
        "child_process": false
    }
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "js")
  }
};
