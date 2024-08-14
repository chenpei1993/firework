const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "index.js"
    },
    resolve: {
        extensions: [".ts", ".js"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loader: "ts-loader"
            }
        ]
    },
    devServer: {
        static:{
            directory: path.join(__dirname, '/src/')
        }
    },
    plugins: [
        new HTMLWebpackPlugin(
            {
                template: "./src/index.html"
            }
        )
    ]
}


