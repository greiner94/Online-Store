const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const mode = process.env.NODE_ENV || 'development';
const devMode = mode === 'development';
const target = devMode ? 'web' : 'browserslist';
const devtool = devMode ? 'source-map' : undefined;

module.exports = {
  mode,
  target,
  devtool,
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  },
  entry: {
    index: path.resolve(__dirname, './src/pages/main/ts/index'),
    cart: path.resolve(__dirname, './src/pages/cart/ts/cart'),
    product: path.resolve(__dirname, './src/pages/product/ts/product'),
    404: path.resolve(__dirname, './src/pages/404/ts/404')
  },
  output: {
    filename: '[name].js',
    clean: true,
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]'
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: 'html-loader',
      },
      {
          test: /\.(c|sa|sc)ss$/i,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                postcssOptions: {
                  plugins: [require('postcss-preset-env')],
                },
              },
            },
            'sass-loader',
          ],
      },
      {
        test: /\.woff2?$/i,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[name][ext]'
        }
      },
      {
        test: /\.(jpe?g|png|webp|gif|svg)$/i,
        use: [
          {
            loader: 'img-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              webp: {
                quality: 75
              },
            }
          }
        ],
        type: 'asset/resource',
      },
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/main/index.html'),
      filename: 'index.html',
      chunks: ['index']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/cart/cart.html'),
      filename: 'cart.html',
      chunks: ['cart']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/product/product.html'),
      filename: 'product.html',
      chunks: ['product']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './src/pages/404/404.html'),
      filename: '404.html',
      chunks: ['404']
    }),
    new CleanWebpackPlugin()
  ],
};
