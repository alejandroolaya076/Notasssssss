require('dotenv').config();
const db = require('./mysql');
const bcrypt = require('bcryptjs');

(async () => {
  try {
    const hashed = await bcrypt.hash('12345', 10);
    db.query('SELECT * FROM usuarios WHERE nombre_usuario = ?', ['admin'], (err, results) => {
      if (err) throw err;
      if (results.length > 0) {
        db.query('UPDATE usuarios SET contraseña = ?, rol = ? WHERE nombre_usuario = ?', [hashed, 'admin', 'admin'], (err) => {
          if (err) throw err;
          console.log(' Admin actualizado');
          process.exit(0);
        });
      } else {
        db.query('INSERT INTO usuarios (nombre_usuario, contraseña, rol) VALUES (?, ?, ?)', ['admin', hashed, 'admin'], (err) => {
          if (err) throw err;
          console.log(' Admin creado');
          process.exit(0);
        });
      }
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
})();


