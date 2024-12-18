import React from 'react';

function SummaryComponent({ moneyIn, moneyOut, destinationAccount, transactionDate }) {
  return (
    <div className="summary-component">
      <p><strong>Ingreso:</strong> {moneyIn}</p>
      <p><strong>Gasto:</strong> {moneyOut}</p>
      <p><strong>Cuenta Destino:</strong> {destinationAccount}</p>
      <p><strong>Fecha de Transacción:</strong> {transactionDate}</p>
    </div>
  );
}

export default SummaryComponent;
