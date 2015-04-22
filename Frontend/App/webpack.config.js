var webpack = require('webpack');
module.exports = {
  entry: [
    "./js/app.js"
  ],
  output: {
    filename: "bundle.js"
  },

  // Source maps support (or 'inline-source-map' also works)
  devtool: 'source-map',

  resolve: {
    extensions: ['', '.webpack.js', '.web.js', '.jsx', '.js']
  },

  module: {
    loaders: [
      { test: /\.jsx$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime'},
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?optional=runtime'},
      { test: /\.css$/, exclude: /node_modules/, loader: "style!css" },
      { test: /\.less$/, exclude: /node_modules/, loader: "style!css!less" },

      { test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        loaders: [
          "url-loader?limit=8192",
          "image?bypassOnDebug&optimizationLevel=7&interlaced=false"
        ]
      }
    ]
  },
  externals: {
    jquery: 'jQuery'
  }
};
