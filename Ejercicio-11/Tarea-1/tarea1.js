"use strict";

class GeoLocalizacion {

    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this));
    }

    getPosicion(posicion){
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.altitud          = posicion.coords.altitude;
        this.precision        = posicion.coords.accuracy;
        this.precisionAltitud = posicion.coords.altitudeAccuracy;
        this.rumbo            = posicion.coords.heading;
        this.velocidad        = posicion.coords.speed;       
    }

    buscaUsuario(){
        var elemento = document.createElement("section"); 
        elemento.innerHTML = "<h2> Tu ubicación actual </h2>";
        $("button").before(elemento);

        var datos = `<ul><li>Coordenadas: [${this.longitud}, ${this.latitud}, ${this.altitud}]</li>`;
        datos += `<li>Precisión: ${this.precision}m, ${this.precisionAltitud}m<ul>`;
        datos += `<li>Rumbo: ${this.rumbo} grados</li>`;
        datos += `<li>Velocidad: ${this.velocidad} m/s</li></ul>`;
        
        elemento.innerHTML += datos;
    }

}

var geo = new GeoLocalizacion();