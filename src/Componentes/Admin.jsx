import React from "react";
import useAdmin from "../Controladores/ControAdmin";
import "../Css/Admin.css";

export default function AdminDashboard() {
  const { usuarios, eliminarUsuario, editarUsuario, cerrarSesion } = useAdmin();

  return (
    <div className="admin-container">
      <h1>Panel de Administrador 👑</h1>

      <table className="admin-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Correo</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id_user}>
              <td>{u.id_user}</td>
              <td>{u.nombre}</td>
              <td>{u.apellido}</td>
              <td>{u.correo}</td>
              <td>{u.rol}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() =>
                    editarUsuario(u.id_user, u.rol === "admin" ? "usuario" : "admin")
                  }
                >
                  Cambiar Rol
                </button>
                <button
                  className="btn-delete"
                  onClick={() => eliminarUsuario(u.id_user)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <button className="btn-logout" onClick={cerrarSesion}>
        Cerrar Sesión
      </button>
    </div>
  );
}
