"use strict";

class FileLoader{

    cargar(files){
        // Definimos los tipos aceptados por la aplicación
        let texto = /text.*/;
        let json = /application.json/;
        let xml = /application.xml/;

        // Gestionamos los archivos...
        this.archivo = files[0];
        let type = this.archivo.type;

        var datos = `<h3> ${this.archivo.name}</h3>`;
        datos += `<ul><li>Tipo del archivo: ${this.archivo.type}</li>`;
        datos += `<li>Tamaño del archivo: ${this.archivo.size} bytes</li>`;
        datos += `<li>Fecha última modificación: ${this.archivo.lastModifiedDate}</li>`;
        datos += '</ul>';
        datos += '<h4>Contenido</h4>';
        datos += '<pre> </pre>';
        
        $('section').html(datos);

        if (type.match(texto) || type.match(json) || type.match(xml)){
            let reader = new FileReader();

            // Cuando cargamos un archivo...
            reader.onload = evento => $('pre').text(reader.result);
            reader.readAsText(this.archivo);
        } else
            $('pre').text('No es un archivo valido')
    }

}

let fileLoader = new FileLoader()