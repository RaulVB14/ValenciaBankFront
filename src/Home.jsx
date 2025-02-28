import "./css/Home.css";
import React from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  const Exit = () => navigate("/");
  const handleProfile = () => navigate("/home/Profile");
  const handleDeposit = () => navigate("/home/Deposit");
  const handleTransfer = () => navigate("/home/Transfer");
  const handleSummary = () => navigate("/home/Summary");

  return (
    <>
      {/* Contenedor del logo y título arriba a la derecha */}
      <div className="header">
        <img src="./images/ValenciaBankLogo.png" alt="ValenciaBank Logo" />
      </div>

      {/* Contenedor de botones */}
      <div className="buttons-container">
        <button className="btn" onClick={Exit}>Salir</button>
        <button className="btn" onClick={handleProfile}>Perfil</button>
        <button className="btn" onClick={handleDeposit}>Ingresar</button>
        <button className="btn" onClick={handleTransfer}>Transferir</button>
        <button className="btn" onClick={handleSummary}>Histórico</button>
      </div>
    </>
  );
}

export default Home;
