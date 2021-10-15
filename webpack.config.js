const { VueLoaderPlugin } = require('vue-loader');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const base = mode => ({
    mode,
    devtool: mode === 'development' ? 'source-map' : false,
    entry: {
        main: {
            import: './src/main.js',
            filename: `main.${ mode === 'production' ? 'prod' : 'dev' }.js`
        }
    },
    output: {
        libraryTarget: 'umd'
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        js: [
                            {
                                loader: 'babel-loader',
                                exclude: [ /node_modules/ ]
                            }
                        ]
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: [ /node_modules/ ]
            },
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: `main.${ mode === 'development' ? 'dev' : 'prod' }.css`
        })
    ],
    externals: {
        'vue': {
            commonjs: 'vue',
            commonjs2: 'vue'
        }
    },
    resolve: {
        extensions: [ '.js', '.ts', '.vue' ]
    }
});

module.exports = [
    base('production'),
    base('development')
];
