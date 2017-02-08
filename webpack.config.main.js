const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const isDevelopment = process.env.NODE_ENV === 'development';

const basePlugins = [new webpack.EnvironmentPlugin(['NODE_ENV'])];
const developmentPlugins = [];
const productionPlugins = [
  new webpack.LoaderOptionsPlugin({ minimize: true, debug: false }),
  new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } }),
  new CopyWebpackPlugin([{ from: 'package.json' }]),
];

module.exports = {
  entry: ['babel-polyfill', './src/main/index.js'],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      { test: /\.js$/, loader: 'eslint-loader', enforce: 'pre' },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: { presets: [['latest', { es2015: { modules: false } }], 'stage-0'] },
      },
    ],
  },
  resolve: { extensions: ['.js', '.json'] },
  plugins: [...basePlugins, ...(isDevelopment ? developmentPlugins : productionPlugins)],
  devtool: isDevelopment ? 'eval-source-map' : false,
  target: 'electron',
  node: { __dirname: isDevelopment },
};
