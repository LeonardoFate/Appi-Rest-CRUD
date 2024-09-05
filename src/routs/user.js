const express = require("express");
const userSchema = require("../models/user");
const { set } = require("mongoose");

const router = express.Router();
/* 
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
*/
// Creación de usuario
router.post('/users', (req, res) => {
    const user = new userSchema(req.body); // Creando un usuario con el esquema y los datos de la petición
    user
    .save() // Guardando en la base de datos
    .then((data) => res.status(201).json({
        message: 'Usuario creado exitosamente',
        data
    }))
    .catch((error) => res.status(500).json({
        message: 'Error al crear el usuario',
        error: error.message
    }));
});

// Obtener todos los usuarios
router.get('/users', (req, res) => {
    userSchema
    .find()
    .then((data) => {
        if (data.length === 0) {
            return res.status(404).json({ message: 'No se encontraron usuarios' });
        }
        res.json(data);
    })
    .catch((error) => res.status(500).json({
        message: 'Error al obtener los usuarios',
        error: error.message
    }));
});

// Buscar usuario por ID
router.get('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
    .findById(id)
    .then((data) => {
        if (!data) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json(data);
    })
    .catch((error) => res.status(500).json({
        message: 'Error al buscar el usuario',
        error: error.message
    }));
});

// Actualizar usuario
router.put('/users/:id', (req, res) => {
    const { id } = req.params;
    const { name, age, email } = req.body;
    userSchema
    .updateOne({ _id: id }, { $set: { name, age, email } })
    .then((data) => {
        if (data.nModified === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado o no se realizaron cambios' });
        }
        res.json({
            message: 'Usuario actualizado exitosamente',
            data
        });
    })
    .catch((error) => res.status(500).json({
        message: 'Error al actualizar el usuario',
        error: error.message
    }));
});

// Eliminar usuario
router.delete('/users/:id', (req, res) => {
    const { id } = req.params;
    userSchema
    .deleteOne({ _id: id })
    .then((data) => {
        if (data.deletedCount === 0) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    })
    .catch((error) => res.status(500).json({
        message: 'Error al eliminar el usuario',
        error: error.message
    }));
});
module.exports = router;