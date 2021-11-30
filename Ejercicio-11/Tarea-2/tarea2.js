"use strict";

class GeoLocalizacion {

    constructor (){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.error.bind(this));
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
        let elemento = document.createElement("section"); 
        elemento.innerHTML = "<h2> Tu ubicación actual </h2>";
        $("button").before(elemento);

        let datos = '';
        if (this.mensaje === undefined) {
            datos += `<ul><li>Coordenadas: [${this.longitud}, ${this.latitud}, ${this.altitud}]</li>`;
            datos += `<li>Precisión: ${this.precision}m, ${this.precisionAltitud}m<ul>`;
            datos += `<li>Rumbo: ${this.rumbo} grados</li>`;
            datos += `<li>Velocidad: ${this.velocidad} m/s</li></ul>`;
        }else 
            datos += '<h2>' + this.mensaje + '</h2>';
        
        elemento.innerHTML += datos;
    }

    error(error){
        switch(error.code){
            case error.PERMISSION_DENIED:
            this.mensaje = "No me diste permiso para localizarte... :("
            break;

            case error.POSITION_UNAVAILABLE:
                this.mensaje = "Posición no disponible"
                break;

            case error.TIMEOUT:
                this.mensaje = "Ha pasado demasiado tiempo"
                break;
            
            case error.UNKNOWN_ERROR:
                this.mensaje = "No entiendo qué pasa :_("
                break;
        }
    }

}

var geo = new GeoLocalizacion();