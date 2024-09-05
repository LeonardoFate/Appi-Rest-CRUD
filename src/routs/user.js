const express = require("express");
const userSchema = require("../models/user");
const { set } = require("mongoose");

const router = express.Router();

//creacion de ususario
router.post('/users', (req, res) =>{
  const user =  userSchema(req.body); //crea un usuario con un schema y datos que llegan de la peticion
    user
    .save() //guardamos en la base
    .then((data) => res.json(data)) //si todo esta ok responde con los datos
    .catch((error) => res.json({ message: error})); //si no mostramos con ms error

});

//get all user
router.get('/users', (req, res) =>{
      userSchema
      .find() 
      .then((data) => res.json(data)) 
      .catch((error) => res.json({ message: error})); 
  
  });

// buscar usuario
  router.get('/users/:id', (req, res) =>{
    const { id } = req.params;
    userSchema
    .findById(id) 
    .then((data) => res.json(data)) 
    .catch((error) => res.json({ message: error})); 
});

//actualizar usuario

router.put('/users/:id', (req, res) =>{
    const { id } = req.params;
    const {name, age, email} = req.body;
    userSchema
    .updateOne({ _id: id}, { $set: {name, age, email} }) 
    .then((data) => res.json(data)) 
    .catch((error) => res.json({ message: error})); 
});


//eliminar
router.delete('/users/:id', (req, res) =>{
    const { id } = req.params;
    userSchema
    .deleteOne({_id: id})
    .then((data) => res.json(data)) 
    .catch((error) => res.json({ message: error})); 
});


module.exports = router;