import { useState } from 'react';
import { api } from '../Api';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!correo || !password) {
      alert('Por favor ingresa correo y contraseña');
      return;
    }

    try {
      const res = await api.post('/login', {
        correo,
        password
      });

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('rol', res.data.rol);

   
      if (res.data.rol === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (err) {
      console.log(err.response?.data);
      alert(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return { correo, setCorreo, password, setPassword, handleLogin };
}
