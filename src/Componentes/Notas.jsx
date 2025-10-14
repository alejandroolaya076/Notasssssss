import React from 'react';
import useNotas from '../Controladores/ControNotas';
import "../Css/Notas.css";

export default function Notas() {
  const { 
    notas, titulo, contenido, setTitulo, setContenido, 
    crearNota, eliminarNota, cargando, error 
  } = useNotas();

  return (
    <div className="notas-container">
      <h2>Mis Notas</h2>

      {error && <p className="error">{error}</p>}
      {cargando && <p>Cargando notas...</p>}

      <div className="nota-form">
        <input 
          type="text" 
          placeholder="Título" 
          value={titulo} 
          onChange={(e) => setTitulo(e.target.value)} 
        />
        <textarea 
          placeholder="Contenido" 
          value={contenido} 
          onChange={(e) => setContenido(e.target.value)}
        ></textarea>
        <button type="button" onClick={crearNota}>Agregar Nota</button>
      </div>

      <ul className="lista-notas">
        {notas.length > 0 ? notas.map(nota => (
          <li key={nota.id} className="nota-item">
            <h3>{nota.titulo}</h3>
            <p>{nota.contenido}</p>
            <button type="button" onClick={() => eliminarNota(nota.id)}>Eliminar</button>
          </li>
        )) : (!cargando && <p>No tienes notas aún.</p>)}
      </ul>
    </div>
  );
}
