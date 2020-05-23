const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const glob = require('glob');

const entryNames = glob
  .sync(path.resolve(__dirname, '../src/examples/*/index.js'))
  .map((fileName) => fileName.match(/\/src\/examples\/(\S*)\/index\.js/)[1]);
const entries = entryNames.reduce(
  (prevObj, entryName) => ({
    ...prevObj,
    [`${entryName}/index`]: path.resolve(__dirname, `../src/examples/${entryName}/index.js`),
  }),
  {}
);
const examplePages = entryNames.map(
  (exampleName) =>
    new HtmlWebpackPlugin({
      title: exampleName,
      filename: `${exampleName}/index.html`,
      template: './src/index.html',
      chunks: [`${exampleName}/index`],
    })
);
// 通过其他合适的方式判断是否为本地调试环境也一样，自由选择。
const styleLoader = process.env.BUILD_ENV === 'development' ? 'style-loader' : MiniCssExtractPlugin.loader;

module.exports = {
  entry: entries,
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
        },
        exclude: /node_modules/,
      },
      {
        test: /\.less$/,
        use: [
          {
            loader: styleLoader,
          },
          { loader: 'css-loader', options: { importLoaders: 1 } },
          {
            loader: 'postcss-loader',
          }
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.(glsl|frag|vert)$/,
        use: ['glslify-import-loader', 'raw-loader', 'glslify-loader'],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    ...examplePages,
  ],
};
