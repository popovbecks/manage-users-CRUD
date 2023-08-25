var webpack = require('webpack');
var path = require('path');

var FaviconsWebpackPlugin = require('favicons-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
    mode: 'development',
    entry: {
        app: path.join(__dirname, './app/index.js')
    },

    output: {
        path: path.join(__dirname, './build'),
        publicPath: "/",
        filename: '[name].bundle.js' //adding [name], fixed bug with multi-loading
    },
    optimization: {
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
    devtool: 'source-map',
    devServer: {
        inline: true,
        contentBase: "./build",
        disableHostCheck: true,
        historyApiFallback: {
            rewrites: [
                {
                    from: /\/user\//,
                    to: function () {
                        return '/index.html';
                    }
                },
                {
                    from: /\/search\//,
                    to: function () {
                        return '/index.html';
                    }
                }
            ]
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
                    {
                        loader: 'style-loader',
                        options: {
                            sourceMap: true
                        }
                    },

                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            includePaths: [
                                path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets'),
                                path.resolve(__dirname, './node_modules/font-awesome/'),
                                path.resolve(__dirname, './node_modules/compass-mixins/lib'),
                            ],
                            sourceMap: true
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
        new FaviconsWebpackPlugin({ logo: './app/img/favicon.png'}),
        new HtmlWebpackPlugin({ template: './app/index.html' }),
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
