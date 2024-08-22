import "./Profile.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import TransferComponent from '../components/TransferComponent';


function Transfer() {
  // Funciones para manejar los clics en los botones
  const navigate = useNavigate();
  const Exit = () => {
    navigate('/home');
  };

  return (
    <div className="buttons-container">
      <h2>VALENCIA BANK</h2>
      <TransferComponent money="1000" account="123456789"/> 
      <button className="btn" onClick={Exit}>Salir</button>
    </div>
  );
}

export default Transfer;
