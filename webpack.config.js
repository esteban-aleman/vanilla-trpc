const path = require('path');
module.exports = {
  module: {
    rules: [{
      test: /\.ts$/,
      exclude: /node_modules/,
      use: {
        loader: 'ts-loader'
      }
    }]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  entry: ['./client/client.ts'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'production'
}
