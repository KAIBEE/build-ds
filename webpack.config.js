const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const autoprefixer = require("autoprefixer");

const PACKAGE = require("./package.json");

module.exports = (env) => {
  const bannerVersion = PACKAGE.version + "-snapshot";
  const banner = "Design System \n" + PACKAGE.name + " - " + bannerVersion + "\nGenerated at " + Date.now();

  return {
    optimization: {
      splitChunks: {
        cacheGroups: {
          styles: {
            name: "styles",
            test: /\.css$/,
            chunks: "all",
            enforce: true
          }
        }
      }
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "css/style.min.css"
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [autoprefixer()]
        }
      }),
      new webpack.BannerPlugin(banner)
    ],
    entry: "./src/index.ts",
    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      ie: 11
                    }
                  }
                ],
                "@babel/preset-flow",
                "@babel/preset-typescript"
              ],
              plugins: ["@babel/plugin-transform-runtime"]
            }
          }
        },
        {
          test: /\.scss$/,
          exclude: /node_modules/,
          use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"]
        }
      ]
    },
    resolve: {
      extensions: [".tsx", ".ts", ".jsx", ".js"]
    },
    output: {
      filename: "js/bundle.min.js",
      path: path.resolve(__dirname, "out"),
      library: "dsLib",
      libraryTarget: "umd"
    },
    mode: "production"
  };
};
