import "./Register.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [DNI, setDNI] = useState("");
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Aquí podrías añadir lógica de autenticación
      console.log("Email:", email);
      console.log("Password:", password);
      console.log("DNI", DNI);
  
      // Si la autenticación es exitosa, redirige a otra página
      navigate('/home'); // Redirige a la página principal o dashboard
    };
  
    return (
      <div className="login-container">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="DNI">DNI:</label>
            <input
              type="DNI"
              id="DNI"
              value={DNI}
              onChange={(e) => setDNI(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn">Registrarse</button>
        </form>
      </div>
    );
}

export default Register;
