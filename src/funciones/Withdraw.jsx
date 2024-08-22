import "./Profile.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import WithdrawMoney from '../components/WithdrawMoney';

function Withdraw() {

  const navigate = useNavigate();
  const Exit = () => {
    navigate('/home');
  };

  return (
    <div className="buttons-container">
      <h2>VALENCIA BANK</h2>
      <WithdrawMoney money="5"/>
      <button className="btn" onClick={Exit}>Salir</button>
    </div>
  );
}

export default Withdraw;
