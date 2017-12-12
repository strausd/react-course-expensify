const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const public_path = path.join(__dirname, 'public');

module.exports = (env, argv) => {
    const isProduction = env == 'production';
    const CSSExtract = new ExtractTextPlugin('styles.css');

    return {
        entry: './src/app.js',
        output: {
            path: public_path,
            filename: 'bundle.js'
        },
        module: {
            rules: [
                {
                    loader: 'babel-loader',
                    test: /\.js$/,
                    exclude: /node_modules/
                },
                {
                    test: /\.s?css$/,
                    use: CSSExtract.extract({
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    })
                }
            ]
        },
        plugins: [
            CSSExtract
        ],
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer: {
            contentBase: public_path,
            historyApiFallback: true
        }
    };
};
