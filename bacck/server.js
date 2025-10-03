require('dotenv').config();
const bcrypt = require('bcryptjs');
const sequelize = require('./mysql'); // conexión MySQL
const mongoose = require('mongoose'); // conexión MongoDB
const Usuario = require('./models/Usuario');
const Task = require('./models/Tarea');
const Image = require('./models/imagen');

async function init() {
  try {
    // Conectar a MySQL
    await sequelize.sync({ force: true }); // ⚠️ elimina tablas antiguas y recrea
    console.log('MySQL sincronizado');

    // Crear usuario de prueba
    const hashedPassword = await bcrypt.hash('testpass', 10);
    await Usuario.create({
      nombre_usuario: 'testuser',
      contraseña: hashedPassword,
      rol: 'usuario'
    });
    console.log('Usuario de prueba creado: testuser / testpass');

    // Conectar a MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB conectado');

    // Opcional: crear una tarea de prueba
    await Task.create({ titulo: 'Tarea de prueba', usuarioId: 1 });
    console.log('Tarea de prueba creada');

    // Opcional: crear imagen de prueba en MongoDB
    const img = new Image({ taskId: 1, data: Buffer.from('test'), contentType: 'text/plain' });
    await img.save();
    console.log('Imagen de prueba creada');

    console.log('✅ Inicialización completa');
    process.exit(0);
  } catch (err) {
    console.error('Error inicializando la base de datos:', err);
    process.exit(1);
  }
}

init();
