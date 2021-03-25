'use strict'
const nodemailer = require("nodemailer");

var controller = {
    sendMail: function (req, res) {
        require('dotenv').config(); //seguridad
        //Recojo los parametros que me lleguen
        var params = req.body;

        var emailData = {
            name: params.name,
            lastName: params.lastName,
            email: params.email,
            phone: params.phone,
            consult: params.consult,
            date: params.date
        }


        //var emailData=req.params.data;
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.PASSWORD, // generated ethereal password
            },
        });

        // send mail with defined transport object
        var mailOptions = {
            from: "Gestor de consulta", // sender address
            to: process.env.TO, // list of receivers
            subject: "Consulta de " + emailData.name + " " + emailData.lastName,
            text: "Telefono: " + emailData.phone + " email: " + emailData.email + "Consulta:" + emailData.consult,
            html: `
            <div style="background-color: #444; border: 2px solid #ccc; border-radius: 10px; padding: 0px; margin: 0px;">
                <h1 style="display:block; margin: 0px; padding: 0px; width: 100%; text-align: center; height: 120px; line-height: 120px; background-color: rgb(255, 255, 87) !important; border-bottom: 2px solid #ccc">Consulta Nueva!</h1>
                <h2 style="padding-left: 40px;">Datos de prospecto</h2>
                <h4 style="padding-left: 80px;">Nombre: ${emailData.name} ${emailData.lastName}</h4>
                <h4 style="padding-left: 80px;">Telefono: ${emailData.phone}</h4>
                <h4 style="padding-left: 80px;">Email: ${emailData.email}</h4>
                <hr>
                <h2 style="padding-left: 40px;">Consulta</h2>
                <p style="display:block; padding-left: 80px; margin-bottom: 100px;">${emailData.consult}</p>
                <h5 style="display: block; width: 100%; text-align: center;">Powered by Facundo Gamond</h5>
            </div>
            `
        }

        //Send email
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                return res.status(500).send({
                    message: "Error, email no enviado",
                    error: err
                })
            } else {
                return res.status(200).send({
                    message: "Email enviado!"
                });
            }
        })


    }

};

module.exports = controller;