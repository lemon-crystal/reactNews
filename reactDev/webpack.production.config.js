var webpack = require("webpack");
var pkg = require("./package.json");
var path = require("path");
var htmlWebpackPlugin = require("html-webpack-plugin");
var openBrowser = require("open-browser-webpack-plugin");
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
	entry: __dirname + "/src/apps/main.jsx",
	output: {
		path: __dirname + "/dist",
		filename: "js/bundle.[chunkhash:8].js"
	},
	resolve: {
		extensions: [".js", ".jsx", ".json"]
	},
	module: {
		rules: [{
			test: /\.jsx$/,
			use: "babel-loader"
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
		}]
	},
	plugins: [
		// webpack 内置的 banner-plugin
		new webpack.BannerPlugin("Copyright by iwen  @iwen.wiki"),

		// 配置模板插件
		new htmlWebpackPlugin({
			template: __dirname + "/src/index.tmpl.html"
		}),

		// 定义为生产环境，编译 React 时压缩到最小
		new webpack.DefinePlugin({
			'process.env': {
				'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
			}
		}),

		//压缩文件，并去掉所有警告
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				//supresses warnings, usually from module minification
				warnings: false
			}
		}),

		// 分离CSS和JS文件
		new ExtractTextPlugin('css/[name].[chunkhash:8].css'),

		// 提供公共代码
		new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'js/[name].[chunkhash:8].js'
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