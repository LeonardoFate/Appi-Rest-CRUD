const express = require("express");
const mongodb = require("mongoose");
require("dotenv").config();
const userRoutes = require("./routs/user")
const port = process.env.PORT || 9000;
const app = express();

//middleware
app.use(express.json());//pruebas
app.use('/api', userRoutes);

//routes
app.get('/', (req, res) => {
    res.send('Welcome to my api');
})

//connection DB
mongodb
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Conexion a la base exitosa"))
    .catch((error) => console.log(error));






//puerto
app.listen(9000, () => console.log('Servidor funcionando en el puerto', port));