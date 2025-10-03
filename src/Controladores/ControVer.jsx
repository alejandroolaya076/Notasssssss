import { useEffect, useState } from 'react';
import { api } from '../Api';

export default function useVerTareas() {
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    const fetchTareas = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No hay token, inicia sesión');

        const res = await api.get('/tasks/mis-tareas', {
          headers: { Authorization: `Bearer ${token}` }
        });

        setTareas(res.data);
      } catch (err) {
        alert(err.response?.data?.message || 'Error al cargar tareas');
      }
    };

    fetchTareas();
  }, []);

  return { tareas };
}
