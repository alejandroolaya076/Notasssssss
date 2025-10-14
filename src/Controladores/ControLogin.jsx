import { useState } from 'react';
import { login } from '../Api';
import { useNavigate } from 'react-router-dom';

export default function useLogin() {
  const [nombre_usuario, setNombreUsuario] = useState('');
  const [contraseña, setContraseña] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!nombre_usuario || !contraseña) {
      alert('Por favor ingresa usuario y contraseña');
      return;
    }

    try {
      const res = await login(nombre_usuario, contraseña);

      console.log(' Respuesta del backend:', res);
      localStorage.setItem('token', res.token);
      localStorage.setItem('rol', res.rol);


      if (res.rol === 'administrador') {
    
        navigate('/Admin');
      } else {
       
        navigate('/notas');
      }

    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Error al iniciar sesión');
    }
  };

  return { nombre_usuario, setNombreUsuario, contraseña, setContraseña, handleLogin };
}
