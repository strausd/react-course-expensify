const path = require('path');
const public_path = path.join(__dirname, 'public');

module.exports = (env, argv) => {
    const isProduction = env == 'production';

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
                    use: [
                        'style-loader',
                        'css-loader',
                        'sass-loader'
                    ]
                }
            ]
        },
        devtool: isProduction ? 'source-map' : 'cheap-module-eval-source-map',
        devServer: {
            contentBase: public_path,
            historyApiFallback: true
        }
    };
};
