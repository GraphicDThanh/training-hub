var path = require('path');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var promise = require('es6-promise').polyfill();
var Clean = require('clean-webpack-plugin');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var pkg = require('./package.json');
var TARGET = process.env.npm_lifecycle_event;
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'build');
var hostname = process.env.HOSTNAME || "localhost";
process.env.BABEL_ENV = TARGET;

var common = {
  entry: [
    "webpack-dev-server/client?http://localhost:8080", // WebpackDevServer host and port
    'webpack/hot/only-dev-server', // "only" prevents reload on syntax errors
    './app/index' // Your appʼs entry point
  ],
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      {
        test: /\.js?$/,
        loaders: ['jshint'],
        // define an include so we check just the files we need
        include: APP_PATH
      }
    ],
    loaders: [
      {
        test: /\.jsx?$/,
        loaders: ['react-hot', 'babel'],
        include: APP_PATH
      },
      // load bootstrap
      { 
        test: /bootstrap\/js\//, 
        loader: 'imports?jQuery=jquery' 
      },
      // load font bootstrap
      { 
        test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,   
        loader: "url?limit=10000&minetype=application/font-woff" 
      },
      { 
        test: /\.woff2$/,   
        loader: "url?limit=10000&minetype=application/font-woff" 
      },
      { 
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,    
        loader: "url?limit=10000&minetype=application/octet-stream" 
      },
      { 
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,    
        loader: "file" 
      },
      { 
        test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,    
        loader: "url?limit=10000&minetype=image/svg+xml"
      },

      // load image
      { 
        test: /\.(png|jpg|woff)$/, 
        loader: 'url-loader?limit=100000' 
      },

      // load font-awesome
      { 
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "url-loader?limit=10000&minetype=application/font-woff" 
      },
      { 
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
        loader: "file-loader" 
      }
    ]
  }
};

if(TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loaders: ['style', 'css']
        },
        { 
          test: /\.scss$/,
          loader: 'style!css!sass'
        }
      ]
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new HtmlwebpackPlugin({
        title: 'Alt'
      })
    ]
  });
}

if(TARGET === 'build' || TARGET === 'stats') {
  module.exports = merge(common, {
    entry: {
      app: APP_PATH,
      vendor: Object.keys(pkg.dependencies)
    },
    output: {
      path: BUILD_PATH,
      filename: '[name].[chunkhash].js'
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract("style-loader", "css-loader")
        },
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract(
            // activate source maps via loader query
            'css?sourceMap!' +
            'sass?sourceMap'
          )
        }
      ]
    },
    devtool: 'source-map',
    plugins: [
      new Clean(['build']),
      new ExtractTextPlugin('styles.[chunkhash].css'),
      new HtmlwebpackPlugin({
        title: 'Alt',
        "assets": {
          "style"  : "styles.[chunkhash].css",
        }
      }),
      new webpack.optimize.CommonsChunkPlugin(
        'vendor',
        '[name].[chunkhash].js'
      ),
      new webpack.DefinePlugin({
        'process.env': {
          // This affects react lib size
          'NODE_ENV': JSON.stringify('production')
        }
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false
        }
      })
    ]
  });
}
