import React from 'react';
import useVerTareas from '../Controladores/ControVer.jsx';
import '../Css/Ver.css';

export default function VerTareas() {
  const { tareas } = useVerTareas();

  return (
    <div className="ver-tareas-container">
      <h3>Tareas Pendientes</h3>
      <ul>
        {tareas.length === 0 && <li>No hay tareas disponibles</li>}
        {tareas.map(t => (
          <li key={t.id}>
            {t.titulo} {t.completada ? '(Completada)' : '(Pendiente)'}
          </li>
        ))}
      </ul>
    </div>
  );
}
