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
            <th>Nombre de Usuario</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.nombre_usuario}</td>
              <td>{u.rol}</td>
              <td>
                <button
                  className="btn-edit"
                  onClick={() =>
                    editarUsuario(u.id, u.rol === "administrador" ? "usuario" : "administrador")
                  }
                >
                  Cambiar Rol
                </button>
                <button
                  className="btn-delete"
                  onClick={() => eliminarUsuario(u.id)}
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
