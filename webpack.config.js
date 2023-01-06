const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require("path");

module.exports = {
    entry: {
      app: "./src/App.js"
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.js"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(gif|svg|jpg|png)$/,
                use: "file-loader",
            }
        ]
    },
    devServer: {
        static: path.join(__dirname, "public"),
        port: 8080,
        hot: true,
        historyApiFallback: true,
    },
    plugins: [new HtmlWebPackPlugin({ template: "./src/index.html"})]
};