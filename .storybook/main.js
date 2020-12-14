const path = require("path");

module.exports = {
  "stories": [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)"
  ],
  "addons": [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
    "storycap/register"
  ],
  "webpackFinal": async (config, { configType }) => {
    config.module.rules.push({
      test: /\.scss$/,
      use: ["style-loader", "css-loader", "sass-loader"],
      include: path.resolve(__dirname, "../")
    });
    config.module.rules.push({
      test: /\.ts$/,
      use: [
        {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-flow", "@babel/preset-typescript"],
            plugins: ["@babel/plugin-transform-runtime"]
          }
        }
      ]
    });
    config.resolve.extensions.push(".ts");
    return config;
  }
};