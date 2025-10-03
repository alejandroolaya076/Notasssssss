import React from 'react';
import useLogin from '../Controladores/ControLogin.jsx';
import { Link } from 'react-router-dom';
import '../Css/Login.css';

export default function Login() {
  const { username, setUsername, password, setPassword, handleLogin } = useLogin();

  return (
    <div className="login-container">
      <h2>Iniciar Sesión</h2>

 
      <input
        className="login-input"
        type="text" 
        placeholder="Usuario"
        value={username}
        onChange={e => setUsername(e.target.value)}
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
