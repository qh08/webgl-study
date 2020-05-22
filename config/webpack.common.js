const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const glob = require("glob");

const __root = path.resolve(__dirname, "../");
const entryNames = glob
  .sync("./src/examples/*/index.js")
  .map((fileName) => fileName.match(/\.\/src\/examples\/(\S*)\/index\.js/)[1]);
const entries = entryNames.reduce(
  (prevObj, entryName) => ({
    ...prevObj,
    [`${entryName}/index`]: `./src/examples/${entryName}/index.js`,
  }),
  {}
);
const examplePages = entryNames.map(
  (exampleName) =>
    new HtmlWebpackPlugin({
      title: exampleName,
      filename: `${exampleName}/index.html`,
      template: "./src/index.html",
      chunks: [`${exampleName}/index`]
    })
);

module.exports = {
  entry: entries,
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
  plugins: [new CleanWebpackPlugin(), ...examplePages],
};
