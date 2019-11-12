var webpack = require("webpack");
var htmlWebpackPlugin = require("html-webpack-plugin");
var openBrowser = require("open-browser-webpack-plugin");

module.exports = {
	entry: __dirname + "/src/apps/main.jsx",
	output: {
		path: __dirname + "/dist",
		filename: "bundle.js"
	},
	resolve: {
		extensions: [".js", ".jsx", ".json"]
	},
	module: {
		rules: [{
			test: /\.(jsx|js)$/,
			use: "babel-loader"
				// query: {
				// 	presets: ["es2015", "react"]
				// }
		}, {
			test: /\.css$/,
			use: [
				"style-loader",
				"css-loader",
				"postcss-loader"
			]
		}, {
			test: /\.(png|jpg|gif|jpeg)$/,
			use: "url-loader?limit=1024" // 限制图片压缩上限
		}, {
			test: /\.less$/,
			use: [
				"style-loader",
				"css-loader",
				"postcss-loader",
				"less-loader"
			]
		}, {
			test: /\.(woff2?|eot|ttf|otf|svg)(\?.*)?$/,
			use: "url-loader"
		}]
	},
	plugins: [
		// 配置模板插件
		new htmlWebpackPlugin({
			template: __dirname + "/src/index.tmpl.html"
		}),

		// 浏览器默认打开插件
		new openBrowser({
		url: "http://localhost:8080"
		}),
		// 可在业务 js 代码中使用 __DEV__ 判断是否是dev模式（dev模式下可以提示错误、测试报告等, production模式不提示）
		new webpack.DefinePlugin({
			__DEV__: JSON.stringify(JSON.parse((process.env.NODE_ENV == 'dev') || 'false'))
		})
	]
}