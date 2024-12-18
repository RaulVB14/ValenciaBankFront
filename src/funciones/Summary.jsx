import "./Summary.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SummaryComponent from "../components/SummaryComponent";

function Summary() {
  const [transactionData, setTransactionData] = useState(null); // Estado para almacenar datos de la transacción
  const navigate = useNavigate();

  // Función para manejar el clic en el botón de "Obtener Información"
  const fetchTransactionData = async () => {
    try {
      const dni = localStorage.getItem("dni"); // Obtener DNI del almacenamiento local
      const response = await axios.get(`http://localhost:8080/transactions/${dni}`); // Reemplaza con la URL correcta de tu API
      setTransactionData(response.data); // Actualizar estado con los datos obtenidos
    } catch (error) {
      console.error('Error al obtener los datos de la transacción', error);
      alert('Hubo un problema al obtener los datos de la transacción');
    }
  };

  // Función para manejar el clic en el botón de "Salir"
  const Exit = () => {
    navigate('/home');
  };

  return (
    <div className="buttons-container">
      <h2>VALENCIA BANK</h2>
      {transactionData ? (
        <SummaryComponent
          moneyIn={transactionData.moneyIn} 
          moneyOut={transactionData.moneyOut} 
          destinationAccount={transactionData.destinationAccount} 
          transactionDate={transactionData.transactionDate}
        />
      ) : (
        <p>No se ha cargado ninguna información de la transacción.</p>
      )}
      <button className="btn" onClick={fetchTransactionData}>Obtener Información</button>
      <button className="btn" onClick={Exit}>Salir</button>
    </div>
  );
}

export default Summary;
