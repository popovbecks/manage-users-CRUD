var webpack = require('webpack');
var path = require('path');
var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        app: path.join(__dirname, './app/index.js')
    },
    output: {
        path: path.join(__dirname, './build'),
        publicPath: "/",
        filename: 'bundle.js',
        chunkFilename: "[id].[hash].bundle.js"
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                uglifyOptions: {
                    mangle: {
                        reserved: ['$scope', '$state', '$rootScope']
                    }
                }
            })
        ],
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all'
                }
            }
        }
    },
    node: {
        fs: 'empty'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules\/(?!(autotrack|dom-utils|bufferutil|utf-8-validate))/, //this need for ie11
                use: [{
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    modules: false
                                }
                            ]
                        ],
                        plugins: ["transform-object-rest-spread"]
                    }
                }]
            },
            {
                test: /\.(scss|css)$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets'),
                                path.resolve(__dirname, './node_modules/font-awesome/'),
                                path.resolve(__dirname, './node_modules/compass-mixins/lib'),
                            ]
                        }
                    }
                ]
            },
            {
                test: /.*\.(gif|png|jpe?g|svg)$/i,
                use: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            pngquant: {
                                quality: "65-90",
                                speed: 4
                            },
                            svgo: {
                                plugins: [
                                    {
                                        removeViewBox: false
                                    },
                                    {
                                        removeEmptyAttrs: false
                                    },
                                    {
                                        inlineStyles: false
                                    },
                                    {
                                        minifyStyles: false
                                    }
                                ]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                use: 'html-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(otf|eot|svg|ttf|woff2|woff)/,
                use: 'url-loader?limit=8192',
                exclude: /img/
            }
        ]

    },
    plugins: [
        new FaviconsWebpackPlugin({ logo: './app/img/favicon.png' }),
        new HtmlWebpackPlugin({
            template: './app/index.html',
            hash: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
        }),
        new webpack.DefinePlugin({
            ENV: JSON.stringify(process.env.NODE_ENV),
            HASH: JSON.stringify(new Date().getTime().toString('16'))
        })
    ]
}

