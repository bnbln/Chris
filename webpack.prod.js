import path from 'path';
import webpack from "webpack";
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyPlugin from 'copy-webpack-plugin';

module.exports = {
  entry: {
      index: path.join(__dirname,'src','index.js'),
    },
  output: {
    path: path.join(__dirname,'build'),
    filename: '[name].bundle.js'
  },
  mode: 'production',
  devtool: 'cheap-module-source-map',
  resolve: {
    modules: [path.resolve(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [
      {
        // this is so that we can compile any React,
        // ES6 and above into normal ES5 syntax
        test: /\.(js|jsx)$/,
        // we do not want anything from node_modules to be compiled
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader", // creates style nodes from JS strings
          "css-loader", // translates CSS into CommonJS
          "sass-loader" // compiles Sass to CSS, using Node Sass by default
        ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|mp4|svg)$/,
        use: [
          {loader: 'file-loader',
          options: {
            outputPath: 'assets',
          }}
        ]
        
      },
      { test: /\.obj$/,
        loader: 'url-loader'
      },

    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname,'public','index.html')
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new CopyPlugin([
      { from: path.join(__dirname,'public','manifest.json'), to: path.join(__dirname,'build','manifest.json') },
      { from: path.join(__dirname,'public','icon'), to: path.join(__dirname,'build','icon') },
      { from: path.join(__dirname,'public','untitled.mtl'), to: path.join(__dirname,'build','untitled.mtl') },
      { from: path.join(__dirname,'public','untitled.obj'), to: path.join(__dirname,'build','untitled.obj') }
    ]),
  ]
};
