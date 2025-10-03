import { useState } from 'react';
import { api } from '../Api';
import { useNavigate } from 'react-router-dom';

export default function useRegister() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !password) {
      alert('Por favor ingresa usuario y contraseña');
      return;
    }

    try {
   
      await api.post('/register', { 
        username, 
        password 
      });

      alert('Usuario registrado correctamente');
      navigate('/'); 
    } catch (err) {
      alert(err.response?.data?.message || 'Error al registrar');
    }
  };

  return { username, setUsername, password, setPassword, handleRegister };
}
