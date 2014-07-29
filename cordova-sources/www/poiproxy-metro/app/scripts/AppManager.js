define([
	"jquery",
	"./Metro"],
	function(
		$,
		Metro){

 	var AppManager = function (localConfig) {
		this.config = localConfig;
 	};

 	AppManager.prototype.getConfig = function () {
 		return this.config;
 	};

 	AppManager.prototype.init = function () {

		var htmlID = this.getUrlId();

		// if (htmlID == "metro"){
			var metro = new Metro(this.getConfig());
			metro.init();
		// } else {
		// 	alert("ERROR ->> URL ID not found");
		// }
 	};

 	AppManager.prototype.getUrlId = function () {

		var fullURL = window.location.href;
		var halfURL = fullURL.split(".html")[0];
		var URLparts = halfURL.split("/");
		return URLparts.pop();
 	};

 	return AppManager;
});