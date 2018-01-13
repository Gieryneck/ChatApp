// module.exports ALWAYS define it at the end of the script. hoisting! only variable declarations are hoisted, not the values!


const path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin'); // injects our js bundle into html template
var webpack = require('webpack'); // needed for UglifyJSPlugin


var UglifyJSPlugin = require('uglifyjs-webpack-plugin'); 
// UglifyJSPlugin protects our code form copying. additionally, it compresses our code (e.g. 4 times). no need to download it;s interal webpack module

var OptimizeJsPlugin = require('optimize-js-plugin');


var env = process.env.NODE_ENV || 'development';




var plugins = [

    new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        inject: 'body',
    })
];


/* BELOW: starting webpack with "NODE_ENV=production npm start" adds 2 plugins
only needed in production environment, this way we save time during development  */
if (env === 'production') {

plugins.push(
    new webpack.optimize.UglifyJsPlugin(),
    new OptimizeJsPlugin({
      sourceMap: false
    })
  );
}

console.log('NODE_ENV:', env);


module.exports = {

    devtool: 'eval-source-map', // sometimes causes cross-origin error, but thats ok. errors are better shown in chrome dev tools.
    
    // with ternary operator we apply plugins listed below for any env other than production. we concatenate entry point to the outcome of conditional. 
    entry: (env !== 'production' ? [
        'react-hot-loader/patch', // we apply this here because this plugin's documentation says so :)
        'webpack-dev-server/client?http://localhost:8080', // serve front end with HMR on this http
        'webpack/hot/only-dev-server', // "only" prevents hot module replacement if syntax errors detected
    ] : []).concat(['./client/index.js']), 

    output: {
        path: path.resolve(__dirname, "public"), // __dirname = "./" - current path in which webpack.config resides
        filename: './bundle.js'
    },

    // loaders  
    module: {

        rules: [

            {
                test: /\.js$/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },

            {
                test: /\.sass$/,
                use: [
                    
                    { loader: 'style-loader'},

                    {
                        loader: 'css-loader',
                        options: {

                            modules: true
                        }
                    },

                    { loader: 'sass-loader',
                        options: {

                            modules: true
                        }
                    }
                ]

                /*
                Parametr use to odpowiednik dla pojedynczego loader. Przyjmuje listę loaderów przez które musi przejść plik .css,
                 aby stać się modułem. Dzięki opcji module: true ustawionej na loaderze css-loader, Webpack nie tylko potrafi 
                 ładować pliki .css, ale także zmienia ich zasięg na lokalny (tzn. działa tylko w obrębie danego modułu,
                     w którym został zaimportowany). Dzięki temu nie musimy się martwić o to, że użyliśmy już jakiejś klasy.

                     2. Loader zmieni nazwę klasy className na module na ciag losowych znakow aby nazwy klas sie nie powtarzaly
                     w wynikowym pliku.
                */
            }
        ]
    },

    // adding plugins that were defined earlier with var plugins
    plugins: plugins
}








