"use strict";

class DatosPrecioLuz {

    constructor() {
        this.lang = "es";
        this.categoria = "mercados";
        this.widget = "precios-mercados-tiempo-real";
    }

    #generarUrl() {
        // Calculamos la fecha de hoy de ayer en base a lo que se ha pasado por el input
        let date = new Date(document.querySelector('input[type="date"]').value)
        let hoy = new Date(date); // creamos una copia...
        let ayer = new Date(date.setDate(date.getDate() - 1));

        this.startDate = "&start_date=" + ayer.toISOString();
        this.endDate = "&end_date=" + hoy.toISOString();

        // Obtenemos la localización
        let geoLimit = $("select option:selected").data('value');

        return this.url = "https://apidatos.ree.es/" 
                            + this.lang + "/datos/"
                            + this.categoria + "/"
                            + this.widget + "?"
                            + this.startDate + "&"
                            + this.endDate
                            + "&time_trunc=hour"
                            + "&geo_limit=" + geoLimit;
    }

    cargarDatos() {
        $.ajax({
            dataType: "JSON",
            url: this.#generarUrl(),
            method: 'GET',
            success: function(datos) {
                $("#result").val(datos.included[0].attributes.values[0].value + "€");
            }, error: function() { // no lo añadas a la aplicación
                $("#result").val('No existe el dato');
            }
        });
    }

}

let luz = new DatosPrecioLuz();