const path = require('path');
const srcPath = path.resolve(__dirname, 'src');

module.exports = (api) => {
  const env = api.cache(() => process.env.NODE_ENV);


 return {
    "presets"
  :
    ["@babel/env", "@babel/react", "@babel/typescript"],
      "plugins"
  :
    [
      "react-hot-loader/babel",
      "@babel/proposal-object-rest-spread",
      "@babel/plugin-proposal-export-default-from",
      [
        "@babel/plugin-proposal-decorators",
        {
          "legacy": true
        }
      ],
      [
        "@babel/plugin-transform-runtime",
        {
          "regenerator": true
        }
      ],
      "@babel/proposal-class-properties",
      [
        "react-css-modules",
        {
          "filetypes": {
            ".scss": {
              "syntax": "postcss-scss",
              "plugins": ["postcss-nested"]
            }
          },
          "generateScopedName": "[name]__[local]__[hash:base64:5]",
          "webpackHotModuleReloading": true,
          "autoResolveMultipleImports": true
        }
      ]
    ]
  }
}
