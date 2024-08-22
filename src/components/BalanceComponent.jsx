import React from "react";

function BalanceComponent({ balance, account}) {
  return (
    <div className="buttons-container">
      <div className="info-row">
        <span>Saldo:</span>
        <span className="info-value">{balance}€</span>
      </div>
      
      <div className="info-row">
        <span>Nº de cuenta:</span>
        <span className="info-value">{account}</span>
      </div>
    </div>
  );
}

export default BalanceComponent;
