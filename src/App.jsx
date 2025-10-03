import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
      </Routes>
    </Router>
  );
}

export default App;
