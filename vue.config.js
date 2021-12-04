const CompressionWebpackPlugin = require('compression-webpack-plugin');
const openInEditor = require('launch-editor-middleware');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Load package.json version number into envs
const packageJson = require('./package.json')
const version = packageJson.version
process.env.VUE_APP_VERSION = version;
process.env.VUE_APP_GITHUB = packageJson.homepage;
process.env.VUE_APP_DATE = new Date().toString().substring(0, 24);

const serviceWorkerVersion = version.replace(/\./g, '')

module.exports = {
	pwa: {
		name: 'Leafcast',
		assetsVersion: serviceWorkerVersion,
		themeColor: '#aa8945',
		msTileColor: '#aa8945',
		background_color: '#402e32',
		iconPaths: {
			favicon32: './img/icons/favicon-32x32.png',
			favicon16: './img/icons/favicon-16x16.png',
			appleTouchIcon: './img/icons/apple-touch-icon.png',
			maskIcon: './img/icons/safari-pinned-tab.svg',
			msTileImage: './img/icons/mstile-150x150.png'
		},
		manifestOptions: {
			name: 'Leafcast',
			short_name: 'Leafcast',
			start_url: '/',
			display: 'standalone',
			background_color: '#402e32',
			version: serviceWorkerVersion
		},

		workboxPluginMode: 'GenerateSW',
	},
	productionSourceMap: false,
	devServer: {
		before (app) {
			app.use('/__open-in-editor', openInEditor());
		 },
	 port: '8002',
	 host: 'localhost',
	},
	transpileDependencies: [ 'vuetify' ],
	configureWebpack: {
		optimization: {
			mangleWasmImports: true,
			removeAvailableModules: true,
			removeEmptyChunks: true,
			mergeDuplicateChunks: true,
			splitChunks: {
				minSize: 10000,
				maxSize: 250000
			},
		},
	},
};

if (process.env.NODE_ENV === 'production') {
	module.exports.configureWebpack.plugins = (module.exports.configureWebpack.plugins || []).concat([
		new BundleAnalyzerPlugin({ analyzerMode: 'static' }),
		new CompressionWebpackPlugin({
			filename: '[path][base].gz',
			algorithm: 'gzip',
			test: /\.(js|css|html|svg)$/,
			minRatio: 0.8,
		}),
		new CompressionWebpackPlugin({
			filename: '[path][base].br',
			algorithm: 'brotliCompress',
			test: /\.(js|css|html|svg)$/,
			compressionOptions: {
				level: 11,
			},
			minRatio: 0.8,
		}),
	]);
}