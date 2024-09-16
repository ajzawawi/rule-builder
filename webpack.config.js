module.exports = (env = {}) => {
  return {
    module: {
      rules: [
        {
          test: /\.less$/,
          use: ["css-loader", "style-loader", "less-loader"]
        },
        {
          test: /\.(png|jp(e*)g|svg|gif)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                name: "images/[hash]-[name].[ext]"
              }
            }
          ]
        }
      ]
    }
  };
};
