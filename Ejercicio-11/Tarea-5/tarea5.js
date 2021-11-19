"use strict";

class MapaDinamicoGoogle {

    initMap() {
        let santigoBernabeu = {lat: 40.45311546182805, lng: -3.6883921769567656};
        let mapa = new google.maps.Map(document.querySelector("main"), 
                                                	{zoom: 8, 
													 center: santigoBernabeu});
        
        let infoWindow = new google.maps.InfoWindow;
        if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
				var pos = {
						lat: position.coords.latitude,
						lng: position.coords.longitude
				};

				infoWindow.setPosition(pos);
				infoWindow.setContent('Estás aquí');
				infoWindow.open(mapa);
				mapa.setCenter(pos);
			}, // si falla algo...
				e => this.handleLocationError(true, mapa, infoWindow, map.getCenter())
			);
		} else // El navegador no soporta GEOLOCATION
			handleLocationError(false, infoWindow, mapa.getCenter());
	}

	handleLocationError(browserHasGeolocation, mapa, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                        'Error: Ha fallado la geolocalización' :
                        'Error: Su navegador no soporta geolocalización');
        infoWindow.open(mapa);
	}

}

var mapaDinamigoGoogle = new MapaDinamicoGoogle();