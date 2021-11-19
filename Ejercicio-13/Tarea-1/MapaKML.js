"use strict";

class MapaKML {
    
    initMap() {
        // Creamos el mapa y le establecemos un centro
        let centro = { lat: 43.52622, lng: -5.65567 };
        let mapa = new google.maps.Map(document.querySelector("main"), 
                                                    {zoom: 8, 
                                                     center: centro,
                                                     mapTypeId: google.maps.MapTypeId.SATELLITE});
        
        // Creamos el infoWindow para poder mostrar el contenido...
        let infoWindow = new google.maps.InfoWindow();

        // Para cada lugar que aparezca en el KML
        this.lugares.forEach(function(lugar) {
            let posicion = lugar.toString().split(","); // separamos las coordenadas en 2
            posicion = { lat: Number(posicion[1]), lng: Number(posicion[0]) };

            // Creamos el marcador
            let marcador = new google.maps.Marker({
                map: mapa,
                position: posicion
            });
        }.bind(this));
    }

    procesarDatos(data) {
        let coordenadas = []; // Aquí guardaremos las coordenadas que iremos procesando...

        // Parseamos el archivo...
        let parser = new DOMParser();
        let dom = parser.parseFromString(data, "text/xml");
        let domCoord = dom.getElementsByTagName("coordinates");

        // Añadimos al ARRAY de coordenadas la coordeanda procesada...
        for (let element of domCoord)
            coordenadas.push(element.innerHTML.trim());
        
        //Cada elemento es un lugar de nacimiento o defunción
        this.lugares = coordenadas.map(conjunto => conjunto.split(" "))

        // Inicializamos el mapa ya con todo cargado
        this.initMap();
    }

    cargar(files) {
        let archivo = files[0];
        let reader = new FileReader();

        if (archivo.name.match(/.kml/)) { // Leemos el archivo... 
            reader.onload = e => this.procesarDatos(reader.result);
            reader.readAsText(archivo);
        } else // Si el archivo no es KML...
            alert('Sólo aceptamos archivos KML')
    }

}

var mapaKML = new MapaKML();