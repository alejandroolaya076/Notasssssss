import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function useDashboard() {
  const [view, setView] = useState(''); 
  const navigate = useNavigate();


  const cerrarSesion = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    setView(''); //   
    navigate('/'); 
  };

  return { view, setView, cerrarSesion };
}
