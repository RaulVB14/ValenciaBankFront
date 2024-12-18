import React from "react";

function DepositMoney({money}) {
  return (
    <div className="buttons-container">
      <div className="info-row">
        <span>Retiro:</span>
        <span className="info-value">{money}€</span>
      </div>
    </div>
  );
}

export default DepositMoney;
