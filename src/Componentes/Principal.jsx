import React from 'react';
import useDashboard from '../Controladores/ControPrin.jsx';
import CrearTarea from '../Componentes/Tarea.jsx';
import VerTareas from '../Componentes/Ver.jsx';
import '../Css/Principal.css';

export default function Dashboard() {
  const { view, setView, cerrarSesion } = useDashboard();
  const username = localStorage.getItem('username'); 

  return (
    <div className="dashboard-container">
      <h2>Bienvenido, {username || 'Usuario'}</h2>

      <div className="dashboard-buttons">
        <button onClick={() => setView('crear')}>Crear Tarea</button>
        <button onClick={() => setView('ver')}>Ver Tareas Pendientes</button>
        <button onClick={cerrarSesion}>Cerrar Sesión</button>
      </div>

      <div className="dashboard-view">
        {view === 'crear' && <CrearTarea />}
        {view === 'ver' && <VerTareas />}
        {!view && <p>Selecciona una opción para comenzar</p>}
      </div>
    </div>
  );
}
