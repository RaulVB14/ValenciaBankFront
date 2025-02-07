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
  
  const convertDateFormat = (dateStr) => {
    return dateStr.replace(/-/g, '/');
  };

  useEffect(() => {
    // Al cargar el componente, intenta cargar los filtros previos desde localStorage
    const savedMinAmount = localStorage.getItem('minAmount');
    const savedMaxAmount = localStorage.getItem('maxAmount');
    const savedStartDate = localStorage.getItem('startDate');
    const savedEndDate = localStorage.getItem('endDate');

    if (savedMinAmount) setMinAmount(savedMinAmount);
    if (savedMaxAmount) setMaxAmount(savedMaxAmount);
    if (savedStartDate) setStartDate(savedStartDate);
    if (savedEndDate) setEndDate(savedEndDate);

    console.log('Cargando filtros previos:', savedMinAmount, savedMaxAmount, savedStartDate, savedEndDate);

    const convertDateFormat = (dateStr) => {
      return dateStr.replace(/-/g, '/');
    };

    fetchTransactionData();
  }, []); // Solo se ejecuta una vez al cargar el componente


  const resetFilters = () => {
    setFilteredData([]);
    setFilters({});
  };

  const Reset = () => {
    resetFilters();
  }

  const Exit = () => {
    navigate('/home');
    
  
    // Lógica adicional para salir de la pantalla si es necesario
  };

  const fetchTransactionData = async () => {
    try {
      const dni = localStorage.getItem("dni");
      const response = await axios.get(`http://localhost:8080/user/get/${dni}`);

      const transactions = response.data.transactions;

      // Formatear las fechas a un formato más sencillo de comparar
      const formattedTransactions = transactions.map(transaction => ({
        ...transaction,
        date: new Date(transaction.date).toLocaleDateString(), // Fecha en formato dd/mm/yyyy
      }));

      setTransactionData(formattedTransactions);
      setFilteredData(formattedTransactions); // Inicialmente se muestran todas las transacciones
    } catch (error) {
      console.error('Error al obtener los datos de la transacción', error);
      alert('Hubo un problema al obtener los datos de la transacción');
    }
  };

  const handleFilter = () => {
    if (!transactionData) return;

    let filteredTransactions = [...transactionData]; // Copia de las transacciones

    // Filtro por monto mínimo
    if (minAmount !== "") {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.amount >= parseFloat(minAmount));
    }

    // Filtro por monto máximo
    if (maxAmount !== "") {
      filteredTransactions = filteredTransactions.filter(transaction => transaction.amount <= parseFloat(maxAmount));
    }

    // Filtro por fecha desde
    if (startDate !== "") {
      filteredTransactions = filteredTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const filterStartDate = new Date(startDate);
        return transactionDate >= filterStartDate;
      });
    }

    // Filtro por fecha hasta
    if (endDate !== "") {
      filteredTransactions = filteredTransactions.filter(transaction => {
        const transactionDate = new Date(transaction.date);
        const filterEndDate = new Date(endDate);
        return transactionDate <= filterEndDate;
      });
    }

    setFilteredData(filteredTransactions); // Actualiza las transacciones filtradas

    // Guardar los filtros en localStorage
    localStorage.setItem('minAmount', minAmount);
    localStorage.setItem('maxAmount', maxAmount);
    localStorage.setItem('startDate', startDate);
    localStorage.setItem('endDate', endDate);
  };



  return (
    <div className="summary-container">
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

      {/* Mostrar transacciones filtradas */}
      <div className="transactions-container">
        {filteredData ? (
          filteredData.length > 0 ? (
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
          )
           : (
            <p>No se encontraron transacciones con los filtros seleccionados.</p>
          )
        ) : (
          <p>No se ha cargado ninguna información de la transacción.</p>
        )}
        <button className="btn" onClick={fetchTransactionData}>Obtener Información</button>
        <button className="btn" onClick={Exit}>Salir</button>
      </div>
    </div>
  );
}

export default Summary;
