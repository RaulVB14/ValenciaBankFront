import "./Home.css";
import React from "react";

function Home() {
  // Funciones para manejar los clics en los botones

  const handlePerfil = () => {
    navigate('/home/Perfil');
  };
  const handleRetirar = () => {
    navigate('/home/Retirar');
  };
  const handleTransferir = () => {
    navigate('/home/Transferir');
  };
  const handleHistorico = () => {
    navigate('/home/Historico'); 
  };
  return (
    <div className="buttons-container">
      <h2>VALENCIA BANK</h2>
      <button className="btn">Salir</button>
      <button className="btn" onClick={handlePerfil}>Perfil</button>
      <button className="btn" onClick={handleRetirar}>Retirar</button>
      <button className="btn" onClick={handleTransferir}>Transferir</button>
      <button className="btn" onClick={handleHistorico}>Histórico</button>
    </div>
  );
}

export default Home;
