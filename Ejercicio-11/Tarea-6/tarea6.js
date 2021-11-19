"use strict";

class MapaDinamicoGoogle {

    initMap() {
        if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(pos) {
				var posActual = new google.maps.LatLng(pos.coords.latitude, 
														pos.coords.longitude);

				// Creamos el mapa con la configuración establecida anteriormente
				let mapa = new google.maps.Map(document.querySelector("main"), 
															{zoom: 14, 
															 center:posActual,
															 mapTypeId: google.maps.MapTypeId.SATELLITE});
		
				// Creamos el info window
				let infoWindow = new google.maps.InfoWindow();

				// Indicamos que queremos buscar las gasolineras más cercanas en un radio
				let request = {
					location: posActual,
					radius: 100000,
					types: ['gas_station'] // si cambias este valor: cambia el tipo de lugar
				};

				// Creamos el servicio para que haga la petición
				let service = new google.maps.places.PlacesService(mapa);
				service.nearbySearch(request, function(results, status) {
					if (status === google.maps.places.PlacesServiceStatus.OK)
						for (let i = 0; i < results.length; i++) {
							// Creamos el marcador
							var marcador = new google.maps.Marker({
								map: mapa,
								position: results[i].geometry.location
							});
					
							// Mostramos el nombre del lugar al hacer click
							google.maps.event.addListener(marcador, 'click', function() {
								infoWindow.setContent(results[i].name);
								infoWindow.open(mapa, this);
							});
						}
				});
			}, // si falla algo...
				e => this.handleLocationError(true, mapa, infoWindow, map.getCenter())
			);
        } else // El navegador no soporta GEOLOCATION
			this.creaMarcador(false, mapa, infoWindow, map.getCenter());
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