const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

const srcPath = path.join(__dirname, 'src');
const buildPath = path.join(__dirname, 'public');

const isProd = process.env.NODE_ENV === 'production';

const getCSSLoader = (isProd, withModules = false) => [
  isProd
    ? {
        loader: MiniCssExtractPlugin.loader,
      }
    : {
        loader: 'style-loader',
      },
  {
    loader: 'css-loader',
    options: {
      modules: withModules
        ? {
            localIdentName: '[name]__[local]__[hash:base64:5]',
          }
        : undefined,
      importLoaders: 1,
      sourceMap: false,
    },
  },
  {
    loader: 'postcss-loader',
    options: {
      plugins: () => [autoprefixer()],
    },
  },
  {
    loader: 'sass-loader',
    options: {
      sassOptions: {
        includePaths: [srcPath, path.join(srcPath, 'styles')],
      },
    },
  },
];

module.exports = {
  entry: path.join(srcPath, 'index.tsx'),
  devtool: !isProd && 'eval-source-map',
  output: {
    path: buildPath,
    filename: 'static/js/bundle-[hash].js',
    publicPath: '/',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      'react-dom': '@hot-loader/react-dom',
      components: path.join(srcPath, 'components'),
      store: path.join(srcPath, 'store'),
      styles: path.join(srcPath, 'styles'),
      utils: path.join(srcPath, 'utils'),
      config: path.join(srcPath, 'config'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: [{ loader: 'babel-loader' }],
      },
      {
        test: /\.s?css$/,
        exclude: /\.modules\.(s?css|sass)$/,
        use: getCSSLoader(isProd, false),
      },
      {
        test: /\.modules\.(s?css|sass)$/,
        use: getCSSLoader(isProd, true),
      },
      {
        test: /\.(?:ico|gif|png|jpg|jpeg|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash].[ext]',
        },
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf|)$/,
        type: 'asset/inline',
        generator: {
          filename: 'fonts/[name].[hash].[ext]',
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      title: 'Avito VAS',
      template: path.join(srcPath, 'index.html'),
    }),
    new ForkTsCheckerWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'static/css/bundle.[name].[contenthash].css',
    }),
  ],
  devServer: {
    port: 8080,
    inline: true,
    hot: true,
  },
};
