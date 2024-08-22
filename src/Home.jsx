import "./Home.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Home() {
  // Funciones para manejar los clics en los botones
  const navigate = useNavigate();
  const Exit = () => {
    navigate('/');
  };
  const handleProfile = () => {
    navigate('/home/Profile');
  };
  const handleWithdraw = () => {
    navigate('/home/Withdraw');
  };
  const handleTransfer = () => {
    navigate('/home/Transfer');
  };
  const handleSummary = () => {
    navigate('/home/Summary'); 
  };
  return (
    <div className="buttons-container">
      <h2>VALENCIA BANK</h2>
      <button className="btn" onClick={Exit}>Salir</button>
      <button className="btn" onClick={handleProfile}>Perfil</button>
      <button className="btn" onClick={handleWithdraw }>Retirar</button>
      <button className="btn" onClick={handleTransfer}>Transferir</button>
      <button className="btn" onClick={handleSummary}>Histórico</button>
    </div>
  );
}

export default Home;
