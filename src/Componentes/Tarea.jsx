import React from 'react';
import useCrearTarea from '../Controladores/ControTarea.jsx';
import '../Css/Tarea.css';

export default function CrearTarea() {
  const { titulo, setTitulo, handleCrear } = useCrearTarea();

  return (
    <div className="crear-tarea-container">
      <h3>Crear Tarea</h3>

     
      <input
        type="text"
        value={titulo}
        onChange={e => setTitulo(e.target.value)}
        placeholder="Título de la tarea"
      />

    
      <button onClick={handleCrear}>Crear</button>
    </div>
  );
}
