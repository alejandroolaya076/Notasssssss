import axios from 'axios';

// Crear la instancia de Axios
export const api = axios.create({
  baseURL: 'http://localhost:5000', // URL de tu backend
});

// Interceptor para enviar el token JWT en todas las peticiones
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token'); // obtener token del localStorage
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// Funciones para los endpoints del backend
export const login = async (username, password) => {
  const res = await api.post('/login', { username, password });
  return res.data;
};

export const register = async (username, password) => {
  const res = await api.post('/register', { username, password });
  return res.data;
};

export const crearTarea = async (title, userId) => {
  const res = await api.post('/tasks', { title, userId });
  return res.data;
};

export const obtenerTareas = async (userId) => {
  const res = await api.get(`/tasks/${userId}`);
  return res.data;
};

export const subirImagen = async (taskId, imageBase64, contentType) => {
  const res = await api.post('/images', { taskId, imageBase64, contentType });
  return res.data;
};

export const obtenerImagenes = async (taskId) => {
  const res = await api.get(`/images/${taskId}`);
  return res.data;
};
