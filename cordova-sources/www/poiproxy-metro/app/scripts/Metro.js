define([
	"jquery",
	"./NetworkManager",
	/*"../bower_components/isotope/jquery.isotope",
	"../bower_components/geolib/dist/geolib"*/
	"isotope",
	"geolib"
	],
	function(
		$,
		NetworkManager,
		$Isotope,
		geolib){

 	var Metro = function (localConfig) {
		this.config = localConfig;
		this.nm = new NetworkManager();
		this.serviceIDs = [];
		this.featuredServices = [];
		this.location = [39.46, -0.38];
		this.features = [];
 	};

 	Metro.prototype.getConfig = function () {
 		return this.config;
 	};


 	Metro.prototype.init = function () {

 		var that = this;

 		function initToolbar() {
		    
		    var nameFilter = $('#filterByName');
		    var distanceFilter = $('#filterByDistance');
		}

 		function savePosition(position) {
		    that.location = [position.coords.latitude, position.coords.longitude]; 
		}

		initToolbar();

	
 		// Config check
 		if (this.config){
		 	if (navigator.geolocation) {

		 		console.log("Metro -- initializing");
		 		
		        $.when( navigator.geolocation.getCurrentPosition(savePosition) ).then(
		        	function () {
		        		 that.updateSpinner("Fetching services...");
		        		 that.request(that.getConfig().urls.describeService);	
		        	}
		        );
		    } else {
		        console.error("Metro -- Geolocation is not supported by this browser");
		        this.updateSpinner("Geolocation not supported. Execution stopped");
		    }
 		} else {
 			console.error("Metro -- Config not present. Stopped execution");
 			this.updateSpinner("No Configuration found. Execution stopped");
 		}
 	};

 	Metro.prototype.request = function (url) { 

 		console.log("Metro -- processing URL: " + url);
 		var that = this;
		 
 		$.when(that.nm.request(url))
 		.done( 	function (result){
 			console.log("Metro -- processing successful");
					that.extractFeaturedServices(result.services);
					that.processFeaturedServices();
 				}
 		)
 		.fail(  function(error) {
 					console.error(error);
 				}  
 		);
 	};

 	Metro.prototype.calculateDistance = function (coords) {

 		var distance;
 		
 		if (coords){
	 		var startLocation = {};
	 		startLocation.latitude = this.location[0];
	 		startLocation.longitude = this.location[1];

	 		var endLocation = {};
			endLocation.latitude = coords[1];
	 		endLocation.longitude = coords[0];

	 		if (coords[0] == 0 || coords[1] == 0)
	 			console.warn("Metro -- warning some coordinates are 0-based");

	 		// geolib as global in window
	 		// getDistance(object start, object end[, int accuracy]) 		
	 		distance = geolib.getDistance(startLocation, endLocation);
	 		if (!distance)
	 			distance = 600;

 		} else {
 			distance = 600;
 		}

 		return distance
 	};

 	Metro.prototype.processFeaturedServices = function () {

 		var that = this;

 		function recursiveRequest(id) {

 			if (id /* && that.serviceIDs.length != 0*/){

 				that.updateSpinner("Accessing service " + id);

	 			var url = that.getConfig().urls.distanceProcessingService + "?service="+id+"&lon="+that.location[1]+"&lat="+that.location[0]+"&dist=500";
	 			console.log("Metro -- processing URL: " + url);

	 			$.when(that.nm.request(url))
			 		.done( 	function (result){
			 					console.log("Metro -- processing successful");
								that.featuredServices.push(result);

								recursiveRequest(that.serviceIDs.shift());	
							
			 				}
			 		)
			 		.fail(  function(error) {
			 					console.error(error);

			 					recursiveRequest(that.serviceIDs.shift());
			 				}  
			 		);
		 	} else {
		 		console.log("Metro -- End of service requests");
		 		that.initLayout();
		 		that.fillLayout();

		 	}
 		}

 		recursiveRequest(this.serviceIDs.shift());

 	};

 	Metro.prototype.initLayout = function () {

 		this.updateSpinner("Initializing layout");

 		var that = this;
 		var counter = 0;

		for (var i = 0; i < this.featuredServices.length; i++) {
			console.log("Metro -- processing Featured Service " + i);
			var service = this.featuredServices[i];

			this.features = this.features.concat(service.features);
		}

		
		for (var j = 0; j < this.features.length; j++){

				console.log("Metro -- processing Feature " + j +" from Featured Service " + i);
				var feature = this.features[j];

				var featLocation = feature.geometry.coordinates;
				var featType = feature.geometry.type;
				var featName = feature.properties.name;
				var featImage = feature.properties.image;

				var distance = this.calculateDistance(featLocation);

				var classes = {
					"0" : "", 	// 33%
					"1" : "w2", // 66%
					"2" : "",	// 33%
					"3" : ""	// 33%
				};

				if(featImage) {
					// $('#container').append('<div class="item ' +classes[counter%4]+'" data-name="'+featName+'" data-distance="'+j+'"><a feature-id="'+j+'"><img src='+featImage +'></a></div>');
					$('#container').append('<div class="item" data-name="'+featName+'" data-distance='+distance+'><a feature-id="'+j+'"><img src='+featImage +'><p>'+featName+'</p><p class="distance">'+distance+'m</p></a></div>');					
					
					counter++;

					console.log("Metro -- Image item " + j + " added");
				}
			}
 	};

 	Metro.prototype.updateSpinner = function (message, hide) {

 		if (hide)
 		{
 			$('#loading-container').hide();
 		} else {
 			if (message) {
 				$('#loading-message').text(message);
 			}
 		}
 	};

 	Metro.prototype.fillLayout = function () { 

 		var that = this;

 		$('#container').isotope({
		    // options
		    isResizeBound: true,
		    itemSelector: '.item',
		  	layoutMode: 'masonry',
		  	animationOptions: {
	            duration: 750,
	            easing: 'linear',
	            queue: false
        	},
		    getSortData: {
		     	name : function( $elem ) {
			    	return $elem.attr('data-name');
			    },
			    distance : function( $elem ) {
			    	return parseInt( $elem.attr('data-distance') );
			    }
		    },
		    sortBy: ['dist']
		});

		$('#toolbar').on('click', 'button', function() {
    		var sortValue = $(this).attr('data-sort-by');
    		$('#container').isotope({sortBy: sortValue});
  		});

		// initialize Isotope after all images have loaded
		$('#container').imagesLoaded( 
			function() {
				
				that.updateSpinner("", true);

				$('#toolbar').css('visibility', 'visible');

				// in order to clean layout and make elements to appear fine, we force a reorder
				$('#filterByName').trigger("click");


		});


		$('#container a').click(function(){
	 		
	        var id = $(this).attr('feature-id');
	        console.log("Metro -- Clicked Feature ID:  " + id)

	        // This would be the <a>'s parent.
			var parent = $(this).parent();
			
			// we need to make the parent active to get .item:active class properties
			// parent.focus();

	        if (id){
	        	var data = that.features[id];
	        	if (data) {
	        		// var url = that.getConfig().urls.mapService + '?data="' + JSON.stringify(data) + '"';
	        		// alert("link to: " + url);
                    var url = data.properties.image;
	        		window.open(url);
	        	} else {
	        		console.warn("Metro -- Clicked Feature Data is null");
	        	}	
	        } else {
	        	console.warn("Metro -- Clicked Feature ID is null");
	        }

	  		return false;
	    }); 
 	};

 	Metro.prototype.extractFeaturedServices = function (serviceList) {

 		for (var id in serviceList) {
 			var service = serviceList[id];
 			var serviceCategories = service.categories;

 			if (serviceCategories) {
 				if ( ($.inArray(this.config.serviceCategory, serviceCategories)) != -1 ) {

 					this.serviceIDs.push(service.id);
 				}
 			} else {
 				console.warn("Metro -- Empty categories in service " + id );
 			}
 		}

 		console.log("Metro -- Featured services extracted");
 	};


 	return Metro;
});