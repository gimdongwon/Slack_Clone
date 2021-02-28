const path = require("path");

const appIndex = path.resolve(__dirname, "src", "index.tsx");
const appBuild = path.resolve(__dirname, "build");
const appSrc = path.resolve(__dirname, "src");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const appHtml = path.resolve(__dirname, "public", "index.html");

const appPublic = path.resolve(__dirname, "public");
const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP !== "false";

module.exports = webpackEnv => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  return {
    mode: webpackEnv,
    entry: appIndex,
    output: {
      path: appBuild,
      filename: isEnvProduction
        ? "static/js/[name].[contenthash:8].js"
        : isEnvDevelopment && "static/js/bundle.js"
    },
    module: {
      rules: [
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: "ts-loader",
              options: {
                transpileOnly: isEnvDevelopment ? true : false
              }
            }
          ],
          include: __dirname
        },
        {
          // import시 file명 tsx도 가져오도록 만듬.
          loader: "file-loader",
          exclude: [/\.(js|mjs|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
          options: {
            outputPath: "static/media",
            name: "[name].[hash:8].[ext]",
            esModule: false
          }
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"]
    },
    plugins: [new HtmlWebpackPlugin({ template: appHtml })],
    devServer: {
      port: 3000,
      contentBase: appPublic,
      open: true,
      historyApiFallback: true,
      overlay: true,
      stats: "errors-warnings"
    },
    devtool: isEnvProduction
      ? shouldUseSourceMap ? "source-map" : false
      : isEnvDevelopment && "cheap-module-source-map"
  };
};
