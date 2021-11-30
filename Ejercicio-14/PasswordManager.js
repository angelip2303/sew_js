"use strict";

class GestorContraseñas {

    constructor() {
        this.#abrirDB(async db => {
            const transaction = db.transaction(['contraseñas'], 'readonly');
            const objectStore = transaction.objectStore('contraseñas');
            const data = await objectStore.getAll();

            transaction.oncomplete = () => {
                for (let element of data.result)
                    this.#añadirContraseñaALaTabla(element);
            }

            transaction.onerror = error => console.log('Error', error);
        });
    }

    /**
     * Abrimos la base de datos y establecemos la función que se ejecutará cuando
     * este proceso se realice con éxito.
     * 
     * @param {function} f --> función que queremos añada a la DB.
     */
    #abrirDB(f) {
        let indexedDB = window.indexedDB;

        if (indexedDB) {
            const request = indexedDB.open('contraseñasDB');
            let db;

            request.onsuccess = e => {
                indexedDB.db = e.target.result; // FIREFOX has some bugs with indexedDB
                db = indexedDB.db;
                f(db);
            }

            request.onupgradeneeded = e => {
                db = e.target.result;
                db.createObjectStore('contraseñas', { autoIncrement: true });
            }
            
            request.onerror = error => console.log('Error', error);
        }
    }

    // Establecemos la operación a realizar cuando se carga desde un archivo
    cargarFichero(files) {
        let archivo = files[0];
        let reader = new FileReader();

        if (archivo.name.match(/.csv/)) { // Leemos el archivo...
            reader.onload = () => this.#procesarDatos(reader.result);
            reader.readAsText(archivo);
        } else // Si el archivo no es CSV...
            alert('Sólo aceptamos archivos .csv')
    }

    // Establecemos la operación a realizar cuando se envía en el formulario
    añadirDesdeFormulario() {
        const data = {
            nombreCuenta: document.getElementById('nombre_cuenta').value,
            email: document.getElementById('email').value,
            contraseña: document.getElementById('password').value
        }

        this.#añadirContraseñaALaTabla(data);
        this.#añadirContraseñaALaDB(data);

        // Añadimos al portapapeles la contraseña que acabamos de crear
        navigator.clipboard.writeText(data.contraseña);
    }

    /**
     * De momento no existe un sistema para gestionar contraseñas repetidas, ya
     * que excedería el objetivo de esta práctica: usar diversas APIs para crear
     * una aplicación web.
     * 
     * Este método se encarga de introducir en la tablatabla, la contraseña
     * que hemos pasado a través del formulario.
     * 
     * @param {*} data --> que queremos sea insertado en la tabla.
     */
    #añadirContraseñaALaTabla(data) {
        if (!this.isTableCreated) {
            $('form').before(`
            <table>
                <tr>
                    <th> Nombre de la cuenta </th>
                    <th> Correo electrónico </th>
                    <th> Contraseña </th>
                </tr>
            </table>`
            );

            this.isTableCreated = true;
        }

        // Procedimiento estándar para añadir a la tabla
        $('table').append(
            `<tr>
                <td> ${data.nombreCuenta} </td>
                <td> ${data.email} </td>
                <td> ${data.contraseña} </td>
            </tr>`
        );
    }

    /**
     * Introducimos en la base de datos el objeto que pasamos como parámetro, esta
     * operación la realizo a través de la función onsuccess tras abrir la DB
     * como se puede observar en el método #abrirDB.
     * 
     * @param {*} data --> que queremos sea insertado en la DB.
     */
    #añadirContraseñaALaDB(data) {
        this.#abrirDB(async db => {
            const transaction = db.transaction(['contraseñas'], 'readwrite');
            const objectStore = transaction.objectStore('contraseñas');
            const request = await objectStore.add(data);

            request.onerror = error => console.log('TXN ERROR', error);
        });
    }

    /**
     * Método que convierte un string en varios objetos y los añada a la tabla,
     * lo utilizamos cuando queremos cargar desde un fichero.
     * 
     * @param {string} data --> que queremos sea insertado en la tabla y DB.
     */
    #procesarDatos(data) {
        data.split(/\r\n|\n/).forEach(element => {
            let linea = element.split(',');

            const data = {
                nombreCuenta: linea[0],
                email: linea[1],
                contraseña: linea[2]
            }

            this.#añadirContraseñaALaTabla(data);
            this.#añadirContraseñaALaDB(data);
        });
    }

    /**
     * Limpia tanto la DB como la tabla.
     */
    limpiar() {
        this.#limpiaTabla();
        this.#limpiaDB();
    }

    // Limpiamos la tabla
    #limpiaTabla() {
        $('table').remove();
        this.isTableCreated = false;
    }

    // Limpiamos la base de datos
    #limpiaDB() {
        this.#abrirDB(async db => {
            const transaction = db.transaction(['contraseñas'], 'readwrite');
            const objectStore = transaction.objectStore('contraseñas');
            const request = await objectStore.clear(); // limpiamos la DB

            request.onerror = error => console.log('TXN ERROR', error);
        });
    }

}

let gestorContraseñas = new GestorContraseñas();