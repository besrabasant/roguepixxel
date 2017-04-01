import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from "extract-text-webpack-plugin";
import alias from 'whs/tools/alias';

const uglify = new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false },
    minimize: true
});

const extractCss = new ExtractTextPlugin('../css/style.css');

const config = {
    entry: {
        app: path.resolve(__dirname, 'src/entry.js'),
        vendor: ['pace-progress', 'lethargy', 'hammerjs', 'gsap', 'mobile-detect'],
        whs: ['whs', 'physics-module-ammonext']
    },
    output: {
        path: path.resolve(__dirname, 'dist/js'),
        filename: '[name].bundle.js'
    },
    devtool: "source-map",
    module: {
        rules: [{
                test: /\.scss$/,
                use: extractCss.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: true
                        }
                    }, 'sass-loader']
                })
            },
            {
                test: /\.css$/,
                use: extractCss.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: true,
                            minimize: true
                        }
                    }]
                })
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)$/,
                use: ['file-loader?name=[name].[ext]&publicPath=../fonts/&outputPath=../fonts/']
            },
            {
                test: /\.(jpg|png)$/,
                use: ['file-loader?emitFile=false&name=[name].[ext]&publicPath=../img/']
            },
            {
                test: /\.js$/,
                exclude: /(node_modules\/(?!whs)|bower_components)/,
                // exclude: /(node_modules|bower_components)/,
                use: ['babel-loader']
            },
            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'raw-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(glsl|frag|vert)$/,
                loader: 'glslify-loader',
                exclude: /node_modules/
            },
            {
                test: require.resolve("pace-progress"),
                loader: "imports-loader?define=>false"
            }
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor', 'whs']
        }),
        // uglify,
        extractCss
    ],
    resolve: {
        alias
    }

};

export {
    config as
    default
};