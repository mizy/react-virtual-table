 


let webpackConfig = {
	entry: "./demo/index.js",
	output: {
		filename: "main.js",
	},
	devtool: "cheap-module-eval-source-map" ,
	devServer: {
		port: 8881,
		index: "index.html",
		open: true,
		host: "0.0.0.0",
		openPage: "./demo/index.html",
		hot: true,
	},
	stats: "minimal",
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: [
					{
						loader: "babel-loader",
					}
				]
			},
			{
				test: /(\.less|\.css)$/,
				use: [
					{ loader: "style-loader" },
					{ loader: "css-loader" },
					{
						loader: "less-loader",
					}
				]
			}
		]
	},
}; 
module.exports = webpackConfig;
