import { useEffect, useState } from 'react';
import axios from 'axios';

export default function useNotas() {
  const [notas, setNotas] = useState([]);
  const [titulo, setTitulo] = useState('');
  const [contenido, setContenido] = useState('');
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(null);

  const token = localStorage.getItem('token');

  useEffect(() => {
    fetchNotas();
  }, []);

  const fetchNotas = async () => {
    if (!token) {
      setError('No hay token, inicia sesión primero.');
      return;
    }

    setCargando(true);
    setError(null);

    try {
      const res = await axios.get('/api/notas', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNotas(res.data);
    } catch (err) {
      console.error('Error al obtener notas:', err.response || err);
      setError(err.response?.data?.message || 'Error al obtener notas.');
    } finally {
      setCargando(false);
    }
  };

  const crearNota = async () => {
    if (!titulo || !contenido) {
      setError('Debes completar título y contenido.');
      return;
    }

    try {
      await axios.post(
        '/api/notas',
        { titulo, contenido },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setTitulo('');
      setContenido('');
      fetchNotas();
    } catch (err) {
      console.error('Error al crear nota:', err.response || err);
      setError(err.response?.data?.message || 'Error al crear nota.');
    }
  };

  const eliminarNota = async (id) => {
    try {
      await axios.delete(`/api/notas/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchNotas();
    } catch (err) {
      console.error('Error al eliminar nota:', err.response || err);
      setError(err.response?.data?.message || 'Error al eliminar nota.');
    }
  };

  return {
    notas,
    titulo,
    contenido,
    setTitulo,
    setContenido,
    crearNota,
    eliminarNota,
    cargando,
    error,
  };
}
