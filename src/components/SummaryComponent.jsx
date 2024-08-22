import React, { useState } from 'react';

function SummaryComponent({moneyIn, moneyOut, destinationAccount, transactionDate}) {
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  return (
    <div className="summary-container">
      <h3>Resumen de la cuenta</h3>
      
      <div className="date-picker">
        <label>Desde: 
          <input 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)} 
          />
        </label>
        <label>Hasta: 
          <input 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)} 
          />
        </label>
      </div>
      
      <div className="summary-info">
        <span>Dinero Ingresado: {moneyIn}</span>
        <span>Dinero Retirado: {moneyOut}</span>
        <span>Cuenta Destino: {destinationAccount}</span>
        <span>Fecha de Transacción: {transactionDate}</span>
      </div>
    </div>
  );
}

export default SummaryComponent;
