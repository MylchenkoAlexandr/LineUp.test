const path = require( "path" );
const HtmlWebpackPlugin = require( "html-webpack-plugin" );
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { EnvironmentPlugin } = require('webpack');
const DotEnv = require('dotenv') ;

const ENVIRONMENTS = {
	PRODUCTION: "production",
	DEVELOPMENT: "development"
}

const cfg = DotEnv.config().parsed ;
const environment = cfg.NODE_ENV ;
const host_api = cfg.HOST_API ;

console.log( "[ cfg ]", cfg );

let config ;
config = {
	devServer: {
		host: cfg.HOST,
		port: cfg.PORT
	},
	entry: "./src/index.js",
	output: {
		path: path.join( __dirname, "/build" ),
		filename: "bundle.js"
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [ "babel-loader" ]
			},
			{
				test: /\.css$/,
				use: [ "style-loader", "css-loader" ]
			},
			{
				test: /\.scss$/,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ]
			},
			{
				test: /\.svg$/,
				use: ['@svgr/webpack'],
			},
			{
				test: /\.(png|jpg|gif)$/,
				use: [
					{
						loader: 'url-loader',
						options: { limit: 5000 }
					}
				]
			}
		]
	},
	plugins: [
		new EnvironmentPlugin({
			NODE_ENV: environment,
			HOST_API: host_api,
			DEBUG: false,
		}),
		new HtmlWebpackPlugin( {
			template: "./src/index.html"
		} )
	]
} ;

if( environment === ENVIRONMENTS.PRODUCTION ) {
	config = {
		... config,
		optimization: {
			minimizer: [
				new UglifyJsPlugin({
					cache: true,
					parallel: true,
					uglifyOptions: {
						compress: true,
						ecma: 6,
						mangle: true
					},
					sourceMap: true
				})
			]
		}
	}
}

module.exports = config ;
