import "/src/css/Profile.css";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Transfer() {
  const [amount, setAmount] = useState('');
  const [destinationAccount, setDestinationAccount] = useState('');
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Obtiene los datos del usuario al montar el componente
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const dni = localStorage.getItem("dni");
        console.log("este es el dni", dni)
        // Realizar la consulta al backend usando el DNI
        const response = await axios.get(`http://localhost:8080/user/get/${dni}`);
        setUserData(response.data);
      } catch (error) {
        console.error('Error al obtener los datos del usuario', error);
      }
    };

    fetchUserData();
  }, []);

  const handleTransfer = async () => {
    if (!userData) return;

    const currentBalance = userData.account.balance;
    console.log("currentBalance  ", currentBalance)
    // Validación del monto de la transferencia
    if (parseFloat(amount) > currentBalance) {
      alert("No tienes suficiente saldo para realizar la transferencia.");
      return;
    }

    try {
      const dni = localStorage.getItem("dni");
      console.log("este es el dni", dni)
      // Realizar la consulta al backend usando el DNI
      const response = await axios.get(`http://localhost:8080/user/get/${dni}`);
      console.log(response.data.account.number)
      
      // Datos de la transacción
      const transactionData = {
        originAccount: response.data.account.number, // Cuenta de origen
        destinationAccount: destinationAccount, // Cuenta de destino (entrada del usuario)
        amount: parseFloat(amount),
        date: new Date().toISOString(), 
      };

      console.log("Info de transactionData: ")
      console.log(transactionData)
      // Enviar ambos objetos al backend
      const response2 = await fetch('http://localhost:8080/transactions/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          transaction: transactionData,
          user: userData.dni
        }),
      });
      if (!response2.ok) {
        throw new Error('Error al realizar el ingreso');
      }

      alert('Transferencia realizada con éxito');
      navigate('/home');
    } catch (error) {
      console.error('Error al realizar la transferencia', error);
      alert('Hubo un problema al realizar la transferencia');
    }
  };


  const Exit = () => {
    navigate('/home');
  };

  return (
    <div className="buttons-container">
      <h2>VALENCIA BANK</h2>
      {userData ? (
        <>
          <div className="transfer-inputs">
            <label>
              Monto a transferir:
              <input 
                type="number" 
                value={amount} 
                onChange={(e) => setAmount(e.target.value)} 
                placeholder="Monto" 
              />
            </label>
            <label>
              Cuenta de destino:
              <input 
                type="text" 
                value={destinationAccount} 
                onChange={(e) => setDestinationAccount(e.target.value)} 
                placeholder="Número de cuenta" 
              />
            </label>
          </div>
          <button className="btn" onClick={handleTransfer}>Realizar Transferencia</button>
        </>
      ) : (
        <p>Cargando datos...</p>
      )}
      <button className="btn" onClick={Exit}>Salir</button>
    </div>
  );
}

export default Transfer;
