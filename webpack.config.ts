import * as webpack from 'webpack';
// in case you run into any typescript error when configuring `devServer`
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
const HtmlWebPackPlugin = require('html-webpack-plugin');

interface Configuration extends webpack.Configuration {
    devServer?: WebpackDevServerConfiguration;
}

const config: Configuration  = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "src/index.html",
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: "inline-source-map",
  devServer: {
    // contentBase: path.join(__dirname, "build"),
    historyApiFallback: true,
    port: 4000,
    open: true,
    hot: true
  },
};

export default config;