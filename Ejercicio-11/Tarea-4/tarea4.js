"use strict";

class MapaDinamicoGoogle {

    initMap() {
        let santigoBernabeu = { lat: 40.45311546182805, lng: -3.6883921769567656 };
        let mapa = new google.maps.Map(document.querySelector("main"), 
                                                {zoom: 15, 
                                                center:santigoBernabeu,
						mapTypeId: google.maps.MapTypeId.SATELLITE}); // me gusta más cómo se ve
        let marcador = new google.maps.Marker({
			position: santigoBernabeu, 
			map: mapa
        });
    }

}

var mapaDinamigoGoogle = new MapaDinamicoGoogle();
