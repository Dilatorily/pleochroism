const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const port = parseInt(process.env.PORT, 10) || 8080;
const isDevelopment = process.env.NODE_ENV === 'development';

const baseEntry = ['babel-polyfill', './src/renderer/index.jsx'];
const developmentEntry = [
  'react-hot-loader/patch',
  `webpack-dev-server/client?http://localhost:${port}`,
  'webpack/hot/only-dev-server',
];
const productionEntry = [];

const basePlugins = [
  new webpack.EnvironmentPlugin(['NODE_ENV']),
  new HtmlWebpackPlugin({ template: 'src/renderer/index.html' }),
];
const developmentPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
];
const productionPlugins = [
  new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
];

module.exports = {
  entry: [...(isDevelopment ? developmentEntry : productionEntry), ...baseEntry],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'renderer.js',
  },
  module: {
    rules: [
      { test: /\.jsx?$/, loader: 'eslint-loader', enforce: 'pre' },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [['latest', { es2015: { modules: false } }], 'stage-0', 'react'],
          plugins: ['react-hot-loader/babel'],
        },
      },
      { test: /\.css$/, use: ['style-loader', 'css-loader'] },
    ],
  },
  resolve: { extensions: ['.js', '.jsx', 'json'] },
  plugins: [...basePlugins, ...(isDevelopment ? developmentPlugins : productionPlugins)],
  devServer: {
    port,
    compress: true,
    hot: true,
    historyApiFallback: true,
  },
  devtool: isDevelopment ? 'eval-source-map' : false,
  target: 'electron-renderer',
};
