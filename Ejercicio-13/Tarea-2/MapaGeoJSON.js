"use strict";

class MapaGeoJSON {

    initMap(files) {
        let archivo = files[0];

        if (archivo.name.match(/.GeoJSON/)) { // Leemos el archivo... 
            // Creamos el mapa y le establecemos un centro
            let centro = { lat: 43.52622, lng: -5.65567 };
            let mapa = new google.maps.Map(document.querySelector("main"), 
                                                        {zoom: 8, 
                                                        center: centro,
                                                        mapTypeId: google.maps.MapTypeId.SATELLITE});

            // Creamos el infoWindow para poder mostrar el contenido...
            let infoWindow = new google.maps.InfoWindow();

            // Cargamos el GeoJSON
            let reader = new FileReader();
            reader.onload = function() {
                mapa.data.addGeoJson(JSON.parse(reader.result));
            };
            reader.readAsText(archivo);

            // Mostramos el nombre del lugar al hacer click
            mapa.data.addListener('click', function(event) {
                infoWindow.setPosition(event.feature.getGeometry().get());
                infoWindow.setContent(event.feature.getProperty("name"));
                infoWindow.open(mapa);
            });
        } else // Si el archivo no es GeoJSON...
            alert('Sólo aceptamos archivos GeoJSON')
    }

}

var mapaGeoJSON = new MapaGeoJSON();