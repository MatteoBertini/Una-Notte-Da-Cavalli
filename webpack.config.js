// Node.js module to work with file and directory paths
const path = require('path');

// Plugin to generate an HTML file and inject scripts automatically
const HtmlWebpackPlugin = require('html-webpack-plugin');

// Determine if the current environment is production
const isProd = process.env.NODE_ENV === 'production';

// Set the base public path depending on the environment
const publicPath = isProd ? '/Una-Notte-Da-Cavalli/' : '/';

module.exports = {
    // Entry point for the application
    entry: './src/index.js',

    // Output configuration
    output: {
        // Output directory path
        path: path.resolve(__dirname, 'dist'),
        // Output file name
        filename: 'bundle.js',
        // Clean the output directory before each build
        clean: true,
        // Public URL of the output when referenced in a browser
        publicPath: publicPath,
    },

    // Mode: 'production' optimizes the bundle, 'development' includes helpful tools
    mode: isProd ? 'production' : 'development',

    // Source map configuration: only enabled in development for easier debugging
    devtool: isProd ? false : 'inline-source-map',

    // Development server configuration
    devServer: {
        // Serve static files from the 'public' directory
        static: {
            directory: path.join(__dirname, 'public'),
            publicPath: '/',
        },
        // Enable Hot Module Replacement (live reloading)
        hot: true,
        // Do not open the browser automatically
        open: false,
        // Port on which the dev server runs
        port: 3000,
    },

    // Module rules (loaders)
    module: {
        rules: [
            {
                // Transpile JS/JSX files using Babel
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader',
            },
            {
                // Load and inject CSS files into the DOM
                test: /\.css$/i,
                use: ['style-loader', 'css-loader'],
            },
            {
                // Load images and GLB files as static assets
                test: /\.(png|glb)$/i,
                type: 'asset/resource',
                generator: {
                    // Output asset file names with hash for cache busting
                    filename: 'assets/[name][hash][ext][query]',
                },
            },
        ],
    },

    // Resolve these extensions automatically in import statements
    resolve: {
        extensions: ['.js', '.jsx'],
    },

    // Plugins used in the build process
    plugins: [
        new HtmlWebpackPlugin({
            // Use this HTML file as a template
            template: './public/index.html',
            // Pass the public path as a variable in the template
            templateParameters: {
                PUBLIC_URL: publicPath,
            },
        }),
    ],
};
