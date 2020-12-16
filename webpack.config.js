// const webpack = require("webpack")
const path = require("path")
module.exports = {
    entry: "./test/launch.ts",
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
                test: /\.ts$/,
                loader: "ts-loader"
            },
            // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
            {
                test: /\.js$/,
                enforce: "pre",
                loader: "source-map-loader"
            }
        ],
    },
    resolve: {
        extensions: [
            '.ts', '.js'
        ]
    },
    // devServer: {
    //     port: 8000,
    //     host: 'localhost',
    //     inline: true,
    //     hot: true,
    //     open: true,
    //     historyApiFallback: true,
    //     contentBase: path.resolve(__dirname),
    //     publicPath: '/',
    //     proxy: {
    //     }
    // },
    // devtool: 'eval-source-map'
    devtool: 'source-map'
}