import { useState } from 'react';
import { api } from '../Api';
import jwtDecode from 'jwt-decode';

 function useCrearTarea() {
  const [titulo, setTitulo] = useState('');

  const handleCrear = async () => {
    try {
      
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No hay token, inicia sesión');

      const decoded = jwtDecode(token); 
      const usuarioId = decoded.id;

      await api.post('/tasks', { titulo, usuarioId }, {
        headers: { Authorization: `Bearer ${token}` } 
      });

      alert('Tarea creada');
      setTitulo('');
    } catch (err) {
      alert(err.response?.data?.message || 'Error al crear tarea');
    }
  };

  return { titulo, setTitulo, handleCrear };
}
export default useCrearTarea;