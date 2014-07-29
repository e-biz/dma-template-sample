require.config({
	baseURL:'./',
	waitSeconds: 20,
	shim: {

	},
	paths: {
		jquery: '../bower_components/jquery/dist/jquery',
		// bootstrap: '../../bower_components/bootstrap/dist/js/bootstrap',
		geolib: '../bower_components/geolib/dist/geolib',
		// imagesloaded: '../../bower_components/imagesloaded/imagesloaded',
		isotope: '../bower_components/isotope/jquery.isotope',
		// modernizr: '../../bower_components/modernizr/modernizr',
		// requirejs: '../../bower_components/requirejs/require',
		// item: '../../bower_components/isotope/js/item',
		// 'layout-mode': '../../bower_components/isotope/js/layout-mode',
		// vertical: '../../bower_components/isotope/js/layout-modes/vertical',
		// 'fit-rows': '../../bower_components/isotope/js/layout-modes/fit-rows',
		// masonry: '../../bower_components/isotope/js/layout-modes/masonry',
		// AppManager: './AppManager',
		// Config: './Config',

	},
	packages: [

	]
});

require(['./scripts/AppManager', './scripts/Config' ],function(AppManager, Config){
// require(['AppManager', 'Config' ],function(AppManager, Config){


	var appManager = new AppManager(Config);
	appManager.init();

});