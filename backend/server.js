const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const usuariosRoutes = require('./Routes/usuarios');
const tareasRoutes = require('./Routes/tareas');
const authRoutes = require('./Routes/auth');

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());


app.use('/auth', authRoutes);       
app.use('/usuarios', usuariosRoutes); 
app.use('/tasks', tareasRoutes);   


app.listen(port, () => {
  console.log(`Servidor backend corriendo en http://localhost:${port}`);
});
