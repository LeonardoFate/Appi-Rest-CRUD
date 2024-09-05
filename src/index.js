const express = require("express");
const mongodb = require("mongoose");
require("dotenv").config();
const port = process.env.PORT || 9000;
const app = express();

//Rutas
app.get('/', (req, res) => {
    res.send('Bienvenidos a mi aplicacion');
})

//conexion base de datos
mongodb
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Conexion a la base exitosa"))
    .catch((error) => console.log(error));






//puerto
app.listen(9000, () => console.log('Servidor funcionando en el puerto', port));