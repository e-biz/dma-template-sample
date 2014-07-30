define([], function() {
	var config = {

		urls: {
			// Show scene mode
			describeService : "http://app.prodevelop.es/poiproxy/describeServices",
			distanceProcessingService : "http://app.prodevelop.es/poiproxy/browseByLonLat",
			mapService : "map.html"
		},
		serviceCategory: "photo"
	};

	return config;
});