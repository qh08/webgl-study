const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const __root = path.resolve(__dirname, "../");

module.exports = {
  entry: ["@babel/polyfill", "./src/dot/index.js"],
  output: {
    path: path.resolve(__root, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.js/,
        use: {
          loader: "babel-loader",
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: ["glslify-import-loader", "raw-loader", "glslify-loader"],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/dot/index.html",
    }),
  ],
};
