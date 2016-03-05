var path = require('path')
var webpack = require('webpack');
var config = require('./webpack.config');
var UglifyJsPlugin = require("webpack/lib/optimize/UglifyJsPlugin");
var ExtractTextPlugin = require("extract-text-webpack-plugin");

config.devtool= false;
config.entry = {
  'app': ['./index.js'],
  vendor: [
            'console-polyfill',
            'es5-shim',
            'es5-shim/es5-sham',
            'es6-promise',
            'json3',
            'html5shiv',
            'html5shiv/dist/html5shiv-printshiv.js',
            'jquery'
        ]
};

config.output= {
  path: path.join(__dirname, 'dist/public/'),
  filename: 'js/[name].js',
  chunkFilename: "js/[id].js",
  /*publicPath: '/'*/
};

config.externals = {
  'react': 'React',
  'react-dom': 'ReactDOM'
};

config.module= {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'es3ify',
    }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel',
      query: {
        presets: ['es2015', 'react', 'stage-0'],
        plugins: ['add-module-exports']
      }
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.less$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap&-minimize!' + 'autoprefixer-loader!' + 'less?sourceMap'
      )
    }, {
      test: /\.css$/,
      loader: ExtractTextPlugin.extract(
        'css?sourceMap&-minimize!' + 'autoprefixer-loader'
      )
    },
    { test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]' },
    { test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff&name=fonts/[name].[ext]' },
    { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream&name=fonts/[name].[ext]' },
    { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&name=fonts/[name].[ext]' },
    { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml&name=fonts/[name].[ext]' },
    { test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=10000&name=images/[name].[ext]' },
    ]
  };
config.plugins = [
  new webpack.optimize.CommonsChunkPlugin('vendor', 'js/vendor.js'),
  new ExtractTextPlugin('/css/[name].css'),
  new UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: {
      except: ['$','jQuery']
    }
  })
];

module.exports = config;