const express = require('express');
const router = express.Router();
const db = require('../db');

router.post('/registro', (req, res) => {
  const {
    tipoDocumento,
    numeroDocumento,
    nombre,
    apellido,
    correo,
    telefono,
    ciudad,
    direccion,
    ocupacion,
    rol
  } = req.body;

  const nuevoUsuario = {
    tipoDocumento,
    numeroDocumento,
    nombre,
    apellido,
    correo,
    telefono,
    ciudad,
    direccion,
    ocupacion,
    rol
  };

  db.query('INSERT INTO usuario SET ?', nuevoUsuario, (err, result) => {
    if (err) {
      console.error('Error MySQL:', err);
      return res.status(500).json({ error: err });
    }
    res.json({ mensaje: 'Usuario registrado correctamente' });
  });
});

router.get('/', (req, res) => {
  db.query('SELECT * FROM usuario', (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(results);
  });
});

module.exports = router;
