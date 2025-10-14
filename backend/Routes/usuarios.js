const express = require('express');
const router = express.Router();
const db = require('../mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');


router.post('/register', async (req, res) => {
  const { nombre_usuario, contraseña } = req.body;

  if (!nombre_usuario || !contraseña)
    return res.status(400).json({ message: 'Faltan datos' });


  db.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });

    if (results.length > 0)
      return res.status(400).json({ message: 'El usuario ya existe' });

    const hashed = await bcrypt.hash(contraseña, 10);

    db.query(
      'INSERT INTO usuarios (nombre_usuario, contraseña, rol) VALUES (?, ?, "usuario")',
      [nombre_usuario, hashed],
      (err) => {
        if (err) return res.status(500).json({ message: 'Error al registrar usuario' });
        res.json({ message: 'Usuario registrado correctamente' });
      }
    );
  });
});

router.post('/login', (req, res) => {
  const { nombre_usuario, contraseña } = req.body;

  db.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', [nombre_usuario], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });
    if (results.length === 0) return res.status(404).json({ message: 'Usuario no encontrado' });

    const usuario = results[0];
    const esValida = await bcrypt.compare(contraseña, usuario.contraseña);

    if (!esValida)
      return res.status(400).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign({ id: usuario.id, nombre_usuario: usuario.nombre_usuario }, 'clave_secreta', {
      expiresIn: '2h'
    });

    console.log(' Login exitoso:', { rol: usuario.rol }); 

    res.json({ message: 'Login exitoso', token, rol: usuario.rol });
  });
});

router.get("/", (req, res) => {
  db.query("SELECT id, nombre_usuario, rol FROM usuarios", (err, results) => {
    if (err) return res.status(500).json({ message: "Error al obtener usuarios" });
    res.json(results);
  });
});
router.delete("/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM usuario WHERE id_user = ?", [id], (err) => {
    if (err) {
      console.error("Error al eliminar usuario:", err);
      return res.status(500).json({ message: "Error al eliminar usuario" });
    }
    res.json({ message: "Usuario eliminado correctamente" });
  });
});
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { rol } = req.body;

  db.query("UPDATE usuario SET rol = ? WHERE id_user = ?", [rol, id], (err) => {
    if (err) {
      console.error("Error al editar usuario:", err);
      return res.status(500).json({ message: "Error al editar usuario" });
    }
    res.json({ message: "Rol actualizado correctamente" });
  });
});
module.exports = router;
