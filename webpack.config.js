const htmlWebapckPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: {
        index: './src/js/index.js'
    },
    output: {
        path: __dirname + '/build',
        filename: '[name].js',
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [{loader: miniCssExtractPlugin.loader}, 'css-loader', 'sass-loader']
            },
            {
                test: /\.js$/,
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }]
            },
            {
                test: /\.(png|gif|jpg|jpeg)$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        outputPath: './assets/images/'
                    }
                }]
            }
        ]
    },
    plugins: [
        new htmlWebapckPlugin({
            template: './src/index.html'
        }),
        new miniCssExtractPlugin({
            filename: 'index.css'
        }),
        // 对静态资源进行打包至 build 中
        new copyWebpackPlugin([
            {
                from: __dirname + '/assets/audios',
                to: './assets/audios'
            },
            {
                from: __dirname + '/assets/song',
                to: './assets/song'
            },
            {
                from: __dirname + '/assets/images',
                to: './assets/images'
            }
        ])
    ],
    devServer: {
        port: 8080,
        contentBase: __dirname
    }
}