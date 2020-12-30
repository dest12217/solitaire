const path = require('path')
const entry = require('./config/entry')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries')
const StyleLintPlugin = require('stylelint-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: entry,
  output: {
    path: path.resolve(__dirname, '../public/assets'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          },
          {
            loader: 'eslint-loader',
            options: {
              configFile: './package.json'
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: () => [
                  require('autoprefixer')()
                ]
              }
            }
          },
          {
            loader: 'sass-loader',
            options: {
              implementation: require('sass'),
              sassOptions: {
                fiber: require('fibers')
              }
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.ts', '.css', '.scss']
  },
  plugins: [
    new FixStyleOnlyEntriesPlugin({
      extensions: ['scss', 'css']
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new StyleLintPlugin({
      files: './src/scss/**/*.scss',
      syntax: 'scss',
      fix: true
   }),
  ]
}
