const express =require('express');
const port = process.env.PORT || 9000;
const app = express();

//Rutas
app.get('/', (req, res) =>{
res.send('Bienvenidos a mi aplicacion');
})

app.listen(9000,() => console.log('Servidor funcionando en el puerto', port));