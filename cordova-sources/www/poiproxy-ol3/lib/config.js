/** FILE: config.js **/
var center = [242764.00183371827, 5069915.212099172];
var zoom = 10;
var poiProxyURL = 'https://app.prodevelop.es/poiproxy';
// var registerServiceURL = '/ficontent/api/poiproxy/registerService';
var registerServiceURL = 'https://app.prodevelop.es/poiproxy/registerService';
var ficontentURL = 'https://app.prodevelop.es/ficontent/api';

var config = {
  "osm" : {
    "categories": ['city', 'natural', 'transport', 'food', 'shop', 'health', 'tourism', 'culture',
        'accommodation', 'leisure', 'religion', 'government', 'services', 'education', 'structures']
  },
  "dbpedia" : {
    "categories": ['shopping', 'cultural_resource', 'religious_building', 'airport', 'natural_resource', 'hospital', 'tourism', 'culture',
        'instruction_resource', 'museum', 'sport_facility', 'hotel', 'restaurant', 'touristic_attraction', 'event', 'transport']
  },
  "services" : {
    "500px" : {
        "browse": true,
        "search": true,
        "strategy": "bbox",
        "name": "Photos - 500px"
    },
    "bcn_transports" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - transports"
    },
    "bcn_taxi" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - taxi"
    },
    "berlin_saving_banks" : {
        "browse": true,
        "search": false,
        "strategy": "tile",
        "name": "Berlin - Saving banks"
    },
    "flickrbbox" : {
        "browse": true,
        "search": true,
        "strategy": "tile",
        "name": "Places - Flickr"
    },
    "geonamespois" : {
        "browse": true,
        "search": false,
        "strategy": "bbox",
        "name": "Places - Geonames POI"
    },
    "citybike_bcn" : {
        "browse": true,
        "search": false,
        "strategy": "bbox",
        "name": "Barcelona - Citybike"
    },
    "bcn_allotjament" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - hotel"
    },
    "twitter" : {
      
    },
    "berlin_banks" : {
        "browse": true,
        "search": false,
        "strategy": "tile",
        "name": "Berlin - banks"
    },
    "bcn_sanitat" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - health"
    },
    "berlin_attractions" : {
        "browse": true,
        "search": false,
        "strategy": "tile",
        "name": "Berlin - attractions"
    },
    "facebook" : {
    },
    "youtube" : {
      
    },
    "berlin_museums" : {
        "browse": true,
        "search": false,
        "strategy": "tile",
        "name": "Berlin - museums"
    },
    "foursquare" : {
        "browse": true,
        "search": true,
        "strategy": "tile",
        "name": "Places - Foursquare"
    },
    "bcn_serveissocials" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - social services"
    },
    "berlin_restaurants" : {
        "browse": true,
        "search": false,
        "strategy": "tile",
        "name": "Berlin - restaurants"
    },
    "nominatim" : {
        "browse": true,
        "search": true,
        "strategy": "bbox",
        "name": "Places - Nominatim"
    },
    "berlin_hotels" : {
        "browse": true,
        "search": false,
        "strategy": "tile",
        "name": "Berlin - hotel"
    },
    "bcn_animalsiplantes" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - animals"
    },
    "bcn_puntswifi_odata" : {
        "browse": true,
        "search": false,
        "strategy": "local",
        "name": "Barcelona - punts wifi (odata)"
    },
    "wikilocation" : {
        "browse": true,
        "search": false,
        "strategy": "bbox",
        "name": "Places - Wikilocation"
    },
    "openweathermap_forecast" : {
      
    },
    "panoramio" : {
        "browse": true,
        "search": false,
        "strategy": "tile",
        "name": "Photos - Panoramio"
    },
    "bcn_religio" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - temple"
    },
    "bcn_puntswifi" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - punts wifi"
    },
    "bcn_companyiesserveis" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - services"
    },
    "flickr" : {
        "browse": true,
        "search": true,
        "strategy": "tile",
        "name": "Photos - Flickr"
    },
    "bcn_educacio" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - education"
    },
    "geonameswiki" : {
        "browse": false,
        "search": true,
        "strategy": "bbox",
        "name": "Places - Geonameswiki"
    },
    "bcn_associacions" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - association"
    },
    "openweathermap" : {
        "browse": true,
        "search": false,
        "strategy": "bbox",
        "name": "Real time - OpenWeatherMap"
    },
    "bcn_centresinformacio" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - tourist info"
    },
    "geonamesstreets" : {
        "browse": true,
        "search": false,
        "strategy": "bbox",
        "name": "Places - Geonames streets"
    },
    "mapquestnominatim" : {
        "browse": true,
        "search": true,
        "strategy": "bbox",
        "name": "Places - Mapquest"
    },
    "citybike" : {
        "browse": false,
        "search": true,
        "strategy": "bbox",
        "name": "Real time - Citybike"
    },
    "instagram" : {
        "browse": true,
        "search": false,
        "strategy": "tile",
        "name": "Photos - Instagram"
    },
    "meetup" : {
        "browse": true,
        "search": true,
        "strategy": "bbox",
        "name": "Events - Meetup"
    },
    "mapquest" : {
        "browse": true,
        "search": true,
        "strategy": "bbox",
        "name": "Places - Mapquest"
    },
    "eventbrite" : {
      
    },
    "bcn_administraciopublica" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - public administration"
    },
    "geonames" : {
        "browse": true,
        "search": true,
        "strategy": "bbox",
        "name": "Places - Geonames"
    },
    "foursquareexplore" : {
        "browse": true,
        "search": true,
        "strategy": "tile",
        "name": "Places - Foursquare"
    },
    "berlin_clubs" : {
        "browse": true,
        "search": false,
        "strategy": "tile",
        "name": "Berlin - clubs"
    },
    "ovi" : {
        "browse": true,
        "search": true,
        "strategy": "tile",
        "name": "Places - Ovi"
    },
    "bcn_mediambient" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - environment"
    },
    "bcn_equipamenttransports" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - equipment"
    },
    "bcn_esports" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - sports"
    },
    "bcn_bicing" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - bikes"
    },
    "yahoo" : {
        "browse": true,
        "search": true,
        "strategy": "bbox",
        "name": "Places - Yahoo"
    },
    "bcn_comunicacio" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - communication"
    },
    "bcn_aparcaments" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - parking"
    },
    "songkick" : {
        "browse": true,
        "search": true,
        "strategy": "bbox",
        "name": "Events - Songkick"
    },
    "mapquestsearch" : {
      
    },
    "bcn_comercial" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - comercial"
    },
    "berlin_management" : {
        "browse": true,
        "search": false,
        "strategy": "tile",
        "name": "Berlin - management"
    },
    "bcn_restaurants" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - restaurant"
    },
    "cloudmade" : {
        "browse": true,
        "search": true,
        "strategy": "bbox",
        "name": "Places - Cloudmade"
    },
    "bcn_cultura" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - culture"
    },
    "nvivo" : {
        "browse": false,
        "search": true,
        "strategy": "bbox",
        "name": "Events - nvivo"
    },
    "bcn_estacionsbus" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - bus"
    },
    "bcn_cementiris" : {
        "browse": true,
        "search": true,
        "strategy": "local",
        "name": "Barcelona - cemetery"
    },
    "geonamestopo" : {
        "browse": true,
        "search": false,
        "strategy": "bbox",
        "name": "Places - Geonamestopo"
    },
    "flickrlonlat" : {
      
    },
    "lastfm" : {
        "browse": true,
        "search": false,
        "strategy": "bbox",
        "name": "Events - LastFM"
    },
    "minube" : {
      
    },
    "eventful" : {
      
    },
    "wikipedia" : {
        "browse": true,
        "search": false,
        "strategy": "bbox",
        "name": "Places - Wikipedia"
    },
    "instagramlocation" : {
        "browse": true,
        "search": true,
        "strategy": "bbox",
        "name": "Places - Instagram"
    }
  }
}