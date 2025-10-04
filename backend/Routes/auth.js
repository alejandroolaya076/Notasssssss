const express = require('express');
const router = express.Router();
const db = require('../db');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { correo, password } = req.body;

  if (!correo || !password) {
    return res.status(400).json({ message: "Por favor ingresa correo y contraseña" });
  }

  try {
    const [rows] = await db.promise().query(
      'SELECT * FROM usuario WHERE correo = ?',
      [correo]
    );

    if (rows.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    const user = rows[0];

    // Comparar contraseñas
    if (user.password !== password) {
      return res.status(401).json({ message: "Contraseña incorrecta" });
    }

    // Token
    const token = jwt.sign({ id: user.id_user, rol: user.rol }, 'secreto', {
      expiresIn: '1h',
    });

    res.json({ token, rol: user.rol });
  } catch (err) {
    console.error("Error en login:", err);
    res.status(500).json({ message: "Error en el servidor" });
  }
});




module.exports = router;
