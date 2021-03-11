const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

const dev = process.env.NODE_ENV === 'development';

const cssLoaders = [
    {
        loader: 'css-loader',
        options: {importLoaders: 2},
    },
];

if (!dev) {
    cssLoaders.push({
        loader: 'postcss-loader',
        options: {
            postcssOptions: {
                plugins: [
                    ['autoprefixer', {browsers: ['last 2 version']}],
                ],
            },
        },
    });
}

const config = {
    entry: {
        app: './src/index.js',
    },
    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: '[name].js',
        publicPath: './public/dist/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, ...cssLoaders],
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, ...cssLoaders, 'sass-loader'],
            },
            {
                test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '/fonts/[name].[ext]',
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192,
                            name: '/img/[name].[ext]',
                        },
                    },
                ],
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            insert: () => {
            },
        }),
        new ESLintPlugin({
            failOnError: true,
        }),
    ],
};

module.exports = (env, argv) => {
    if (argv.mode === 'development') {
        config.devtool = 'eval-cheap-module-source-map';
    }

    return config;
};