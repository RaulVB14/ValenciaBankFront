import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SummaryComponent from "../components/SummaryComponent";

function Summary() {
  const [transactionData, setTransactionData] = useState(null);
  const [filteredData, setFilteredData] = useState(null); // Estado para las transacciones filtradas
  const [minAmount, setMinAmount] = useState(""); // Estado para el importe mínimo
  const [maxAmount, setMaxAmount] = useState(""); // Estado para el importe máximo
  const [startDate, setStartDate] = useState(""); // Estado para la fecha inicial
  const [endDate, setEndDate] = useState(""); // Estado para la fecha final
  const navigate = useNavigate();

  useEffect(() => {
    if (transactionData !== null) {
      handleFilter();
    }
  }, [minAmount, maxAmount, startDate, endDate]);

  const fetchTransactionData = async () => {
    try {
      const dni = localStorage.getItem("dni");
      const response = await axios.get(`http://localhost:8080/user/get/${dni}`);

      const transactions = response.data.transactions;

      const formattedTransactions = transactions.map(transaction => {
        return {
          ...transaction,
          date: new Date(transaction.date).toLocaleString().substring(0, 10)
        };
      });

      setTransactionData(formattedTransactions);
      setFilteredData(formattedTransactions);
    } catch (error) {
      console.error('Error al obtener los datos de la transacción', error);
      alert('Hubo un problema al obtener los datos de la transacción');
    }
  };
  
  //los filtros no funcionan ver que pasa
  const handleFilter = () => {
    if (transactionData === null) {
      return;
    }

    let filteredTransactions = transactionData;

    if (minAmount !== "") {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.amount >= parseFloat(minAmount));
    }
    if (maxAmount !== "") {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.amount <= parseFloat(maxAmount));
    }

    if (startDate !== "") {
      filteredTransactions = filteredTransactions.filter(transaction => new Date(transaction.date) >= new Date(startDate));
    }
    if (endDate !== "") {
      filteredTransactions = filteredTransactions.filter(transaction => new Date(transaction.date) <= new Date(endDate));
    }

    setFilteredData(filteredTransactions);
  };

  const Exit = () => {
    navigate('/home');
  };

  return (
    <div className="buttons-container">
      <h2>VALENCIA BANK</h2>

      {/* Filtros */}
      <div className="filters">
        <label>Importe mínimo: </label>
        <input
          type="number"
          value={minAmount}
          onChange={(e) => setMinAmount(e.target.value)}
          placeholder="Ingrese importe mínimo"
        />
        <label>Importe máximo: </label>
        <input
          type="number"
          value={maxAmount}
          onChange={(e) => setMaxAmount(e.target.value)}
          placeholder="Ingrese importe máximo"
        />
        <label>Fecha desde: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>Fecha hasta: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleFilter}>Aplicar Filtros</button>
      </div>

      {filteredData ? (
        filteredData.map((transaction, index) => (
          <SummaryComponent
            key={index}
            id={transaction.id}
            originAccount={transaction.originAccount}
            destinationAccount={transaction.destinationAccount}
            amount={transaction.amount}
            date={transaction.date}
          />
        ))
      ) : (
        <p>No se ha cargado ninguna información de la transacción.</p>
      )}

      <button className="btn" onClick={fetchTransactionData}>Obtener Información</button>
      <button className="btn" onClick={Exit}>Salir</button>
    </div>
  );
}

export default Summary;
