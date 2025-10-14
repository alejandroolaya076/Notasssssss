const express = require('express');
const router = express.Router();
const db = require('../mysql');


router.post('/crear', (req, res) => {
  const { titulo, usuarioId } = req.body;

  if (!titulo || !usuarioId)
    return res.status(400).json({ message: 'Faltan datos' });

  db.query(
    'INSERT INTO tareas (titulo, usuarioId, completada) VALUES (?, ?, false)',
    [titulo, usuarioId],
    (err) => {
      if (err) return res.status(500).json({ message: 'Error al crear nota' });
      res.json({ message: 'Nota creada correctamente' });
    }
  );
});
router.get('/:usuarioId', (req, res) => {
  const { usuarioId } = req.params;

  db.query('SELECT * FROM tareas WHERE usuarioId = ?', [usuarioId], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener notas' });
    res.json(results);
  });
});

module.exports = router;
