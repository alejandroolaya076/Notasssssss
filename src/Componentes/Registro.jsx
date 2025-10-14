import React from 'react';
import useRegister from '../Controladores/ControRegistro.jsx';
import { Link } from 'react-router-dom';
import '../Css/Registro.css';

export default function Register() {
 
  const { nombre_usuario, setNombreUsuario, contraseña, setContraseña, handleRegister } = useRegister();

  return (
    <div className="register-container">
      <h2>Registro de Usuario</h2>

      
      <input
        className="register-input"
        type="text"
        placeholder="Usuario"
        value={nombre_usuario}
        onChange={e => setNombreUsuario(e.target.value)}
      />
      <input
        className="register-input"
        type="password"
        placeholder="Contraseña"
        value={contraseña}
        onChange={e => setContraseña(e.target.value)}
      />
      <button className="register-button" onClick={handleRegister}>
        Registrarse
      </button>

      <p>
        ¿Ya tienes cuenta? <Link to="/Login">Iniciar Sesión</Link>
      </p>
    </div>
  );
}
