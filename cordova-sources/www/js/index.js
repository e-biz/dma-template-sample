var url = "http://public.opendatasoft.com/api/records/1.0/search?dataset=positions_geographiques_des_stations_du_reseau_ratp&rows=500&facet=reseau&exclude.reseau=bus&exclude.reseau=rer";
var posts_url = url;

$(document).ready(function() {
	// jQuery is properly loaded at this point
	// so proceed to bind the Cordova's deviceready event
	$(document).bind('deviceready', app.onDeviceReady);

});

readPosts= function() {
    console.log('Reading posts');
    $.ajax({
        type: "GET",
        dataType: "json",
        url: posts_url,
        success: onSuccess,
        error: onError
    });

    console.log('Reading posts asynchrounously');
};

onSuccess= function(data) {
    var items= [];
    $.each(data.records, function(key, val){
        items.push('<li data-filtertext="'+ val.fields.nom_station +'>');
        items.push('<div class="station-name">')
        items.push(val.fields.nom_station)
        items.push('</div>');
        items.push('<div class="station-details">')
        items.push(val.fields.arrondissement)
        items.push('</div>');
        items.push('<div class="station-details">')
        items.push(val.fields.reseau)
        items.push('</div>');
        items.push('</li>');


    });
    $('#posts').html(items.join("")); //prevent commas between two elements
    $('#posts').listview('refresh');
    console.log('Exiting onSuccess');
};

onError= function(data, textStatus, errorThrown) {
    console.log('Data: ' + data);
    console.log('Status: ' + textStatus);
    console.log('Error: ' + errorThrown);
    $("#posts").html('Error while loading posts');
    console.log('Exiting onError');
};


var app = {


	onDeviceReady: function() {
		console.log('Device is ready');
		readPosts();
	}

};
