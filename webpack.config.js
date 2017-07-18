const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const nodeEnv = process.env.NODE_ENV || 'development';
const isProduction = nodeEnv === 'production';

const sourcePath = path.join(__dirname, './app');

const plugins = [
    new HtmlWebpackPlugin({
        template: path.join(sourcePath, 'index.html'),
        filename: 'index.html'
    })
];

module.exports = {
    devtool: isProduction ? 'eval' : 'source-map',
    entry: {
        js: './app/index.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            { test: /\.(js|jsx)$/, exclude: /node_modules/, use: 'babel-loader'},
            { test: /\.css$/, use: [ 'style-loader', 'css-loader' ] }
        ]
    },
    plugins,
    resolve: {
        extensions: ['.webpack-loader.js', '.web-loader.js', '.loader.js', '.js', '.jsx'],
    modules: [
      path.resolve(__dirname, 'node_modules'),
      sourcePath,
    ],
    },
    devServer: {
    contentBase: isProduction ? './build' : false,
    historyApiFallback: true,
    port: 3000,
    compress: isProduction,
    inline: !isProduction,
    hot: !isProduction,
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      publicPath: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};