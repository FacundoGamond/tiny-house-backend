'use strict'
const nodemailer = require("nodemailer");

var controller = {
    sendMail: function (req, res) {
        require('dotenv').config(); //seguridad
        //Recojo los parametros que me lleguen
        var params = req.body;

        let ts = Date.now();
        let date_ob = new Date(ts);
        let date = date_ob.getDate();
        let month = date_ob.getMonth() + 1;
        let year = date_ob.getFullYear();

        var emailData = {
            name: params.name,
            phone: params.phone,
            email: params.email,
            place: params.place,
            date: date + "-" + month + "-" + year
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
            subject: "Consulta de " + emailData.name,
            text: "Telefono: " + emailData.phone + " email: " + emailData.email,
            html: `
            <div style="background-color: #444; border: 2px solid #ccc; border-radius: 10px; padding: 0px; margin: 0px;">
                <h1 style="display: block; padding: 30px 0; margin: 0; width: 100%; text-align: center; line-height: 1.2em; background-color: rgb(255, 255, 87) !important; border-bottom: 2px solid #ccc; justify-content: center;">Consulta Nueva! (${emailData.date})<br>Nomos Web</h1>
                <h2 style="padding-left: 40px;">Datos de prospecto</h2>
                <h4 style="padding-left: 80px;">Nombre: ${emailData.name}</h4>
                <h4 style="padding-left: 80px;">Telefono: ${emailData.phone}</h4>
                <h4 style="padding-left: 80px;">Email: ${emailData.email}</h4>
                <h4 style="padding-left: 80px;">Lugar: ${emailData.place}</h4>
                <h5 style="display: block; width: 100%; text-align: center;">Powered by <a href="https://www.facundogamond.com.ar/" target="_blanc">Facundo Gamond</a></h5>
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