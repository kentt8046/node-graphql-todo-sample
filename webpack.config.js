const { resolve } = require("path");

const webpack = require("webpack");
const CleanWebpackPlugin = require("clean-webpack-plugin");
const { CheckerPlugin } = require("awesome-typescript-loader")

const { pick } = require("lodash");

const allowEnv = [
];

module.exports = {

  entry: {
    bundle: "./protected/root.ts",
    vendor: ["lodash", "jquery"]
  },
  output: {
    path: resolve(__dirname, "./public/js"),
    filename: "[name].js",
    publicPath: "/",
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"]
  },

  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: "./public",
    port: 8080,
  },

  module: {
    loaders: [
      {
        test: /\.tsx?$/,
        loader: [
          "awesome-typescript-loader?configFileName=./tsconfig.client.json"
        ]
      }
    ]
  },
  plugins: [
    new CheckerPlugin(),
    new CleanWebpackPlugin(["public/js"]),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      "process": JSON.stringify({ env: pick(process.env, allowEnv) }),
    }),
  ],
  externals: {
    bundle: {
      "lodash": "_",
      "jquery": "jQuery"
    }
  },
};
