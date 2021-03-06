'use strict'

//configurando express
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path= require('path');

//Cargar archivos de rutas
var project_routes = require('./routes/project');

//Middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); //Cualquier peticion la transforma a json

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//Rutas
app.use(express.static(path.join(__dirname, 'client')));
app.use('/api', project_routes); //Para agregarle un /api a todas las rutas al ppio

//Exportar
module.exports = app;