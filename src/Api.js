import axios from 'axios';

export const api = axios.create({
  baseURL: 'http://localhost:5000', 
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

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
