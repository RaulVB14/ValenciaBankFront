import React from 'react';

function SummaryComponent({ id, originAccount, destinationAccount, amount, date }) {
  return (
    <div className="summary-component">
      <p><strong>id:</strong> {id}</p>
      <p><strong>originAccount:</strong> {originAccount}</p>
      <p><strong>Cuenta Destino:</strong> {destinationAccount}</p>
      <p><strong>Cantidad de dinero:</strong> {amount} $ </p>
      <p><strong>Fecha de Transacción:</strong> {date}</p>
    </div>
  );
}

export default SummaryComponent;
