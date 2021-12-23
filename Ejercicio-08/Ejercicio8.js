"use strict";

class DatosMeteorologicos {

    constructor() {
        this.lugares = ['Avilés', 'Candás', 'Gijón', 'Luanco', 'Cabranes'];

        this.apikey = "";
        this.codigoPais = "ES";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
    }

    #generarUrl(lugar) {
        return this.url = "http://api.openweathermap.org/data/2.5/weather?q=" 
                            + lugar 
                            + "," 
                            + this.codigoPais 
                            + this.unidades 
                            + this.idioma 
                            + "&APPID=" 
                            + this.apikey;
    }

    cargarDatos() {
        this.lugares.forEach( lugar => this.#cargarDatos(lugar) );
        $("button").attr("disabled","disabled");
    }

    #cargarDatos(lugar) {
        var elemento = document.createElement("section"); 
        elemento.innerHTML = "";
        $("button").before(elemento);

        $.ajax({
            dataType: "json",
            url: this.#generarUrl(lugar),
            method: 'GET',
            success: function(datos) {
                var datosMeteorologicos = "<h2>" + datos.name + " - " + datos.sys.country + "</h2>";
                    datosMeteorologicos += '<img src="https://openweathermap.org/img/w/' + datos.weather[0].icon +'.png" alt="icono que representa el tiempo" />';
                    datosMeteorologicos += "<ul><li>Temperatura: " + datos.main.temp + "ºC</li>";
                    datosMeteorologicos += "<li>Temperatura máxima: " + datos.main.temp_max + "ºC</li>";
                    datosMeteorologicos += "<li>Temperatura mínima: " + datos.main.temp_min + "ºC</li>";
                    datosMeteorologicos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                    datosMeteorologicos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                    datosMeteorologicos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                    datosMeteorologicos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                    datosMeteorologicos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                    datosMeteorologicos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                    datosMeteorologicos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                    datosMeteorologicos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                    datosMeteorologicos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                    datosMeteorologicos += "<li>Nubosidad: " + datos.clouds.all + " %</li></ul>";
                
                elemento.innerHTML = datosMeteorologicos;
            }, error: function() { // no lo añadas a la aplicación
                $(elemento).remove();
            }
        });
    }

}

let meteo = new DatosMeteorologicos();
