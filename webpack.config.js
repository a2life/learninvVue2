let path =require('path');
let webpack = require('webpack');
let HtmlWebpackPlugin = require('html-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin'); //new in vue-loader 15
const MiniCssExtractPlugin=require('mini-css-extract-plugin')// extract css from bundle.

module.exports = {
    entry: './src/main.ts',
    output: {
        path: path.resolve(__dirname, './app'),

        filename: 'app.js'
    },
    resolve:
        {
            extensions: [".ts", ".tsx", ".js"],
            /*  alias:
                  {
                      'vue$':
                          'vue/dist/vue.esm.js'
                  }*/ //if dynamic vue template compiler is needed, then uncomment.
        }
    ,

    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                loader:
                    'ts-loader',
                options: {
                    appendTsSuffixTo: [/\.vue$/]

                }
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    esModule: true
                    // other vue-loader options go here

                }
            },
            {
                test: /\.css$/,
                use: [
                   process.env.NODE_ENV !=='production'
                    ? 'vue-style-loader'
                       : MiniCssExtractPlugin.loader,
                    'css-loader'

            ]
            },
            {
                test: /\.woff2?$|\.ttf$|\.eot$|\.svg$/,
                use: [{
                    loader: 'file-loader'
                }]
            },
            {
                test: /\.(png|jpg|gif|svg|json)$/,
                loader:
                    'file-loader',
                options:
                    {
                        name: '[name].[ext]?[hash]'
                    }
            }
        ]
    },
    plugins: [
        /*  new webpack.ProvidePlugin({
              $: 'jquery',
              jQuery: 'jquery', 'window.jQuery': 'jquery'
          }) */
        new VueLoaderPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './src/index.ejs'
        }),
        new MiniCssExtractPlugin(
            {
                filename: '[name].css'

            }
        )

    ],

    devServer: {
        historyApiFallback: true,
        noInfo:
            true
    }
    ,

    performance: {
        hints: false
    }
    ,

    devtool: '#eval-source-map'
};
if (process.env.NODE_ENV === 'production') {
    module.exports.devtool = '#source-map';
    module.exports.mode = 'production';
    module.exports.plugins = (module.exports.plugins || []).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            }
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ])
}
