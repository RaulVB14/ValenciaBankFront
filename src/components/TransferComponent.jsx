import React from "react";

function TransferComponent({ money, account}) {
  return (
    <div className="buttons-container">
      <div className="info-row">
        <span>Dinero:</span>
        <span className="info-value">{money}€</span>
      </div>
      
      <div className="info-row">
        <span>Nº de cuenta:</span>
        <span className="info-value">{account}</span>
      </div>
    </div>
  );
}

export default TransferComponent;
