import React from 'react';
import useLogin from '../Controladores/ControLogin.jsx';
import { Link } from 'react-router-dom';
import '../Css/Login.css';

export default function Login() {
  const { correo, setCorreo, password, setPassword, handleLogin } = useLogin();

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>

     <input
    className="login-input"
    type="email"
    placeholder="Correo"
    value={correo}
    onChange={e => setCorreo(e.target.value)}
    />

    <input
    className="login-input"
    type="password"
    placeholder="Contraseña"
    value={password}
    onChange={e => setPassword(e.target.value)}
    />


      
      <button className="login-button" onClick={handleLogin}>
        Iniciar Sesión
      </button>

      <p>
        ¿No tienes cuenta? <Link to="/Registro">Registrarse</Link>
      </p>
    </div>
  );
}
