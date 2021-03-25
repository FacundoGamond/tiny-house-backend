'use strict'

//Configuro expres y el controlador
var express = require('express');
var ProjectController = require('../controllers/project');
var router = express.Router();


//Rutas a metodos del controlador
router.post('/send-email', ProjectController.sendMail);//Enviar un mail para contacto
module.exports = router;