const express = require('express');
const jwt = require('jsonwebtoken');
const db = require('../db');
const router = express.Router();

const SECRET = 'secreto123';

function authMiddleware(req, res, next) {
  const header = req.headers['authorization'];
  if (!header) return res.status(403).json({ message: 'No autorizado' });

  const token = header.split(' ')[1];
  jwt.verify(token, SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = decoded;
    next();
  });
}

router.post('/', authMiddleware, (req, res) => {
  const { titulo } = req.body;
  const usuarioId = req.user.id;

  db.query(
    'INSERT INTO tareas (titulo, usuarioId) VALUES (?, ?)',
    [titulo, usuarioId],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error al crear tarea' });
      res.json({ message: 'Tarea creada correctamente' });
    }
  );
});

router.get('/mis-tareas', authMiddleware, (req, res) => {
  const usuarioId = req.user.id;

  db.query('SELECT * FROM tareas WHERE usuarioId = ?', [usuarioId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener tareas' });
    res.json(results);
  });
});

module.exports = router;
