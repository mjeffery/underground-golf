const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const root = path.join(__dirname, '/node_modules/phaser')
const phaser = path.join(root, 'build/custom/phaser-split.js')
const pixi = path.join(root, 'build/custom/pixi.js')
const p2 = path.join(root, 'build/custom/p2.js')

module.exports = {
	entry: [
		'webpack-dev-server/client?http://localhost:8080',
		'webpack/hot/only-dev-server',
		'./src/index.js'
	],
	output: {
		path: path.join(__dirname, 'public'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		loaders: [
			{ test: /pixi.js/, loader: 'script' },
			{ test: /p2.js/, loader: 'script'},
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				query: {
					plugins: ['transform-runtime'],
					presets: ['latest']
				}
			},
			{ test: /\.html$/, loader: 'html' }
		]
	},
	resolve: {
		alias: { 
			'phaser': phaser, 
			'p2': p2, 
			'pixi.js': pixi 
		}
	},
	devServer: {
		contentBase: './public',
		hot: true
	},
	devtool: 'source-map',
	plugins: [
		new HtmlWebpackPlugin({ template: './src/index.html' }),
		new webpack.HotModuleReplacementPlugin()
	]
}
