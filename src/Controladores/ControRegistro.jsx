import { useState } from 'react';
import { register } from '../Api';
import { useNavigate } from 'react-router-dom';

export default function useRegister() {
  const [nombre_usuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!nombre_usuario || !contraseña) {
      alert('Por favor ingresa usuario y contraseña');
      return;
    }

    try {
      await register(nombre_usuario, contraseña);
      alert('Usuario registrado correctamente');
      navigate('/');
    } catch (err) {
      alert(err.response?.data?.message || 'Error al registrar');
    }
  };

  return { nombre_usuario, setNombreUsuario, contraseña, setContraseña, handleRegister };
}
