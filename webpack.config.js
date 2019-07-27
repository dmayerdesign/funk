const { resolve } = require('path')
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  entry: './functions/src/index.ts',
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: {
            configFile: resolve(__dirname, 'functions/tsconfig.json')
          },
        }],
        // exclude: /node_modules/,
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    plugins: [ new TsconfigPathsPlugin({ configFile: resolve(__dirname, './tsconfig.paths.json') }) ]
  },
  output: {
    filename: 'index.js',
    path: resolve(__dirname, 'functions/lib')
  }
};
