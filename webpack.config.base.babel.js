import path from 'path';
import ProgressBarPlugin from 'progress-bar-webpack-plugin';

export default {
  quiet: true,
  resolve: {
    root: [
      path.resolve('src')
    ],
    extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.+(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        loader: "babel",
      },
    ]
  },
  plugins: [
    new ProgressBarPlugin()
  ]
};
