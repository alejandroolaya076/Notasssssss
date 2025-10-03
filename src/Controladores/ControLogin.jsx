import { useState } from 'react';
import { api } from '../Api';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!username || !password) {
      alert('Por favor ingresa usuario y contraseña');
      return;
    }

    try {
      const res = await api.post('/login', {
      nombre_usuario: username,
      contraseña: password
      });
      

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('username', username);

      navigate('/Dashboard');
    } catch (err) {
      console.log(err.response?.data);  
      alert(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return { username, setUsername, password, setPassword, handleLogin };
}
