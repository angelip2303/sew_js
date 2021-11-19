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

    creaMapa(){
        let elemento = document.createElement("section"); 
        elemento.innerHTML = "";
        $("button").before(elemento);

        let apiKey = "&key=AIzaSyCeae0K4XiQPc08oZDRb8lRZcQQNZpc0oE";
        let url = "https://maps.googleapis.com/maps/api/staticmap?";
        let center = `center= ${this.latitud}, ${this.longitud}`;
        let zoom ="&zoom=15";
        let size= "&size=800x600";
        let marcador = `&markers=color:blue%7Clabel:A%7C${this.latitud}, ${this.longitud}`;
        let sensor = "&sensor=false";

        this.imagenMapa = url + center + zoom + size + marcador + sensor + apiKey;

        elemento.innerHTML += `<img src="${this.imagenMapa}"/>`;
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