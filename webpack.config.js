const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  entry: {
    main: path.resolve( __dirname, 'src/js/index.js' ),
  },
  output: {
    path: path.resolve( __dirname, 'dist/' ),
    filename: 'js/[hash].js',
  },
  resolve: {
    modules: [ __dirname, 'node_modules' ]
  },
  cache: true,
  watch: false,
  watchOptions: {
    ignored: [ './node_modules/**', './dist/**' ]
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              esModule: false
            }
          },
          {
            loader: 'pug-plain-loader',
            options: {
              baseir: __dirname
            }
          }
        ]
      },
      
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
      },

      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: '../'
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  'autoprefixer',
                ],
              },
            },
          },
          'sass-loader',
          'import-glob-loader'
        ]
      },

      {
        test: /\.js$/,
        exclude: path.resolve( __dirname, 'node_modules/' ),
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              [
                '@babel/preset-env',
                {
                  useBuiltIns: 'usage',
                  corejs: 3,
                  debug: true
                }
              ]
            ]
          }
        }
      },

      {
        test: /\.(gif|png|jpe?g|svg|woff|woff2|eot|ttf)$/,
        type: 'asset/resource',
        generator: {
          filename: '[path][hash][ext]'
        }
      },
    ],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[hash].css',
    }),

    new HtmlWebpackPlugin({
      template: path.resolve( __dirname, 'src/pug/index.pug' )
    })
  ],
};