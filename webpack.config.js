const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const TerserPlugin = require('terser-webpack-plugin');

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
    ],
    optimization: {
        minimizer: [
            new TerserPlugin({
                // 可选的 TerserPlugin 配置
                terserOptions: {
                    compress: {
                        drop_console: true, // 删除所有的 `console` 语句
                        dead_code: true, // 移除未被引用的代码
                    },
                    mangle: {
                        safari10: true, // 兼容 Safari 10
                    },
                    output: {
                        comments: false, // 删除所有的注释
                        beautify: false, // 最小化输出
                    },
                },
            }),
        ],
    },
}


