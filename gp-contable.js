'use strict'

//Conexion a base de datos
var mongoose = require('mongoose');
var app = require('./app'); //Configuracion de express
var port = 3000;

app.listen(port, () => {
    console.log("Servidor corriendo correctamente en la url: http://localhost:"+port);
});
