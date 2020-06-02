 


let webpackConfig = {
	entry: "./src/index.js",
	output: {
		filename: "index.js",
		library: "ReactVirtualTable",
		libraryTarget: "umd",
		libraryExport: "default" // 默认导出
	},
	mode: "production",
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
		]
	},
	
}; 
module.exports = webpackConfig;
