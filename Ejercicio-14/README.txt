APIS Utilizadas:
    1. API FILE --> para poder cargar ficheros .csv con las contraseñas a la
    app, se adjunta un fichero de ejemplo llamado: contraseñas.csv

    2. API IndexedDB --> para permitir la persistencia de la contraseñas, cada
    contraseña cargada en la aplicación se guardará en una pequeña base de datos
    que persiste más allá de la sesión actual. Da problemas su uso en Firefox.

    3. API clipboard --> cuando se escribe una contraseña a través del formulario,
    el campo contraseña escrito, se guarda automáticamente en el portapapeles para 
    su uso posterior.