import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from "./InicioSesion/Login";
import Register from "./InicioSesion/Register";
import Home from "./Home";
import Profile from "./funciones/Profile"
import Summary from "./funciones/Summary"
import Withdraw from "./funciones/Withdraw"
import Transfer from "./funciones/Transfer"

//DE AQUI SALEN TODAS LAS RUTAS DE LA PAGINA WEB
export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainContent />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home/>}/>
        <Route path ="/home/Profile" element={<Profile/>}/>
        <Route path ="/home/Summary" element={<Summary/>}/>
        <Route path ="/home/Withdraw" element={<Withdraw/>}/>
        <Route path ="/home/Transfer" element={<Transfer/>}/>
      </Routes>
    </Router>
  );
}

//funncion en la que digo a donde quiero que vaya si a una pantalla u a otra
function MainContent() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login'); // Redirige a la página de Login
  };

  const handleRegister = () => {
    navigate('/register'); // Redirige a la página de Registro
  };

  //Siempre el return sera el html con sus componentes
  return (
    <div className="button-container">
      <button className="btn" onClick={handleLogin}>Login</button>
      <button className="btn" onClick={handleRegister}>Registro</button>
    </div>
  );
}


export default App;
