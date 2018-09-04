const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
	entry: ['./src/app.js'],
	output: {
		path: path.join(__dirname, "dist"),
		filename:'app.bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env'],
						plugins: ["@babel/plugin-transform-runtime"]
					}
				}
			}
		]
	}
}