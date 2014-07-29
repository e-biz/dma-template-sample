define([
	"jquery",
	"./Metro"],
	function(
		$,
		Metro){



 	var NetworkManager = function () {
		
 	};

 	NetworkManager.prototype.init = function () {

		
 	};

 	NetworkManager.prototype.request = function (url, settings)
	{
		

		var formData = {};
		var deferred = $.Deferred();

		var defaultSettings = {
			url : url,
		    type: "POST",
		    data : formData,
		    dataType: 'jsonp',
		    success: function(data, textStatus, jqXHR)
		    {
		    	console.log("NetworkManager -- successful request");
				deferred.resolve(data);
				 
		    },
		    error: function (jqXHR, textStatus, errorThrown)
		    {
		 		console.error("NetworkManager -- request error: ", errorThrown);
		 		console.error("NetworkManager -- request error status: ", textStatus);

		 		deferred.reject(new Error(textStatus));
		    }
		};

		$.extend(defaultSettings, settings || {});
		$.ajax(defaultSettings);	
		

		

		return deferred.promise();
	};
 	

 	return NetworkManager;
});