const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const usuarioRoutes = require('./Routes/usuarios');
const tareaRoutes = require('./Routes/tareas');

const app = express();

app.use(cors());
app.use(express.json());


app.use('/usuarios', usuarioRoutes);
app.use('/tareas', tareaRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(` Servidor corriendo en puerto ${PORT}`));
