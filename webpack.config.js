var HtmlWebpackPlugin = require('html-webpack-plugin');

const env = process.env.NODE_ENV;

module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
        modules: [
            'node_modules'
        ]
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
              test: /\.css/,
              loader: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg)$/,
                loader: 'file-loader',
              },
              {
                test: /\.svg$/,
                loader: ['svg-url-loader'],
              },
              {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader',
              },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        template: './src/index.html'
    })],
    devServer: {
        historyApiFallback: true
    },
    externals: {
        // global app config object
        config: JSON.stringify({
            apiUrl: 'https://donriddo-event-manager-api.herokuapp.com/api'
        })
    }
}