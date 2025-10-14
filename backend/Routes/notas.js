import express from 'express';
import { pool } from '../mysql.js'; // tu conexión a MySQL
import { verificarToken } from '../middleware/auth.js'; // middleware de autenticación

const router = express.Router();

// Crear nota
router.post('/', verificarToken, async (req, res) => {
  const { titulo, contenido } = req.body;
  const usuario_id = req.usuario.id; // asumimos que tu middleware agrega el usuario
  try {
    const [result] = await pool.query(
      'INSERT INTO notas (titulo, contenido, usuario_id) VALUES (?, ?, ?)',
      [titulo, contenido, usuario_id]
    );
    res.json({ mensaje: 'Nota creada', id: result.insertId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al crear la nota' });
  }
});

// Obtener notas del usuario
router.get('/', verificarToken, async (req, res) => {
  const usuario_id = req.usuario.id;
  try {
    const [notas] = await pool.query('SELECT * FROM notas WHERE usuario_id = ?', [usuario_id]);
    res.json(notas);
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al obtener notas' });
  }
});

// Actualizar nota
router.put('/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  const { titulo, contenido } = req.body;
  const usuario_id = req.usuario.id;
  try {
    const [result] = await pool.query(
      'UPDATE notas SET titulo = ?, contenido = ? WHERE id = ? AND usuario_id = ?',
      [titulo, contenido, id, usuario_id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Nota no encontrada' });
    res.json({ mensaje: 'Nota actualizada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al actualizar nota' });
  }
});

// Eliminar nota
router.delete('/:id', verificarToken, async (req, res) => {
  const { id } = req.params;
  const usuario_id = req.usuario.id;
  try {
    const [result] = await pool.query('DELETE FROM notas WHERE id = ? AND usuario_id = ?', [id, usuario_id]);
    if (result.affectedRows === 0) return res.status(404).json({ mensaje: 'Nota no encontrada' });
    res.json({ mensaje: 'Nota eliminada' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ mensaje: 'Error al eliminar nota' });
  }
});

export default router;
