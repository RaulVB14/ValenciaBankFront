import "./Summary.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import SummaryComponent from "../components/SummaryComponent";


function Summary() {
  // Funciones para manejar los clics en los botones
  const navigate = useNavigate();
  const Exit = () => {
    navigate('/home');
  };

  return (
    <div className="buttons-container">
      <h2>VALENCIA BANK</h2>
      <SummaryComponent moneyIn={"50€"} moneyOut={"60€"} destinationAccount={"123456789"} transactionDate={"21/08/2001"}/>
      <button className="btn" onClick={Exit}>Salir</button>
    </div>
  );
}

export default Summary;
