import axios from 'axios';
export const api = axios.create({
  baseURL: 'http://localhost:3001'
});


api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => Promise.reject(error));


export const register = async (nombre_usuario, contraseña) => {
  const res = await api.post('/usuarios/register', { nombre_usuario, contraseña });
  return res.data;
};


export const login = async (nombre_usuario, contraseña) => {
  const res = await api.post('/usuarios/login', { nombre_usuario, contraseña });
  return res.data; 
};
export const crearTarea = async (titulo, usuarioId) => {
  const res = await api.post('/tareas/crear', { titulo, usuarioId });
  return res.data;
};


export const obtenerTareas = async (usuarioId) => {
  const res = await api.get(`/tareas/${usuarioId}`);
  return res.data;
};

export const getUsuarios = async () => {
  const res = await api.get('/usuarios');
  return res.data;
};
export const crearNota = async (id_usuario, titulo, contenido) => {
  const res = await api.post("/notas", { id_usuario, titulo, contenido });
  return res.data;
};

export const obtenerNotasUsuario = async (id_usuario) => {
  const res = await api.get(`/notas/usuario/${id_usuario}`);
  return res.data;
};

export const obtenerTodasLasNotas = async () => {
  const res = await api.get("/notas");
  return res.data;
};

