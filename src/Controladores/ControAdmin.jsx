import { useState, useEffect } from "react";
import { api } from "../Api";
import { useNavigate } from "react-router-dom";

export default function useAdmin() {
  const [usuarios, setUsuarios] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const rol = localStorage.getItem("rol");

    if (rol !== "administrador") {
      alert("Acceso denegado 🚫. Solo para administradores.");
      navigate("/");
      return;
    }

    fetchUsuarios();
  }, [navigate]);
  const fetchUsuarios = async () => {
    try {
      const res = await api.get("/usuarios");
      setUsuarios(res.data);
    } catch (error) {
      console.error("Error al cargar usuarios:", error);
    }
  };
  const eliminarUsuario = async (id) => {
    if (!window.confirm("¿Seguro que quieres eliminar este usuario?")) return;

    try {
      await api.delete(`/usuarios/${id}`);
      fetchUsuarios();
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  };
  const editarUsuario = async (id, nuevoRol) => {
    try {
      await api.put(`/usuarios/${id}`, { rol: nuevoRol });
      fetchUsuarios();
    } catch (error) {
      console.error("Error al editar usuario:", error);
    }
  };
  const cerrarSesion = () => {
    localStorage.clear();
    navigate("/");
  };

  return { usuarios, eliminarUsuario, editarUsuario, cerrarSesion };
}
