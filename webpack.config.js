const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

const webpack = require('webpack');
var CompressionPlugin = require("compression-webpack-plugin");

const ExtractTextPlugin = require("extract-text-webpack-plugin");
var BowerWebpackPlugin = require("bower-webpack-plugin");
var LodashModuleReplacementPlugin = require('lodash-webpack-plugin');
var path = require( 'path');



module.exports = {
  //devtool: 'eval-source-map',
  devtool: 'source-map',
  entry:  __dirname + "/src/index.js",
  output: {
    path: __dirname + "/public",
    filename: "bundle.js"
  },
  
  resolve: {
    alias: {
      'react': 'preact-compat/dist/preact-compat',
      'react-dom': 'preact-compat/dist/preact-compat',
      'react-addons-css-transition-group': 'rc-css-transition-group'
    }
  },
        

  module: {

    loaders: [
      {
        test: /\.json$/,
        loader: "json-loader"
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
            path.resolve(__dirname, './src'),
            path.resolve(__dirname, './node_modules/preact-compat'),
            path.resolve(__dirname, './node_modules/preact'),
        ],
        exclude: /node_modules/,
        query: {
          presets: ['es2015','react','stage-0']
        }
      },{
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader'
      }
    ]
  },

  devServer: {
    contentBase: "./public",
    historyApiFallback: true,
    inline: true,
    host:"0.0.0.0"
  },
  plugins: [
     new webpack.LoaderOptionsPlugin({
        alias: {
       'react': 'preact-compat',
       'react-dom': 'preact-compat'
        }}),
  new UglifyJSPlugin({comments: false, // remove comments
      compress: {
        
      },
      output: {
        comments: false
      }
    }),


    // new LodashModuleReplacementPlugin,

    new ExtractTextPlugin("bundle.css"),
    // new BowerWebpackPlugin(),
    new webpack.optimize.AggressiveMergingPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.SourceMapDevToolPlugin(__dirname + "/public/bundle.js.map"),
    // new webpack.optimize.DedupePlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    // new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]), 
    new CompressionPlugin({
      asset: "[path].gz[query]",
      algorithm: "gzip",
      test: /\.js$|\.css$|\.html$/,
      //threshold: 10240,
      minRatio: 0.8
    })
  ]
}
