import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminDashboard from "./Componentes/Admin";
import Login from "./Componentes/Login";
import Register from "./Componentes/Registro";
import Dashboard from "./Componentes/Principal";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/Registro" element={<Register />} />
        <Route path="/Principal" element={<Dashboard />} />
        <Route path="/Admin" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
