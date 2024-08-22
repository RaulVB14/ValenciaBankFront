import "./Register.css";
import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

function Register() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [dni, setDni] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Comprobar si el DNI ya existe
        const dniExists = await fetch(`http://localhost:8080/user/exists/${dni}`)
            .then(response => response.json())
            .catch(error => {
                console.error("Error checking DNI:", error);
                return false;
            });

        if (dniExists) {
            setErrorMessage("El DNI ya está registrado. Por favor, use otro.");
        } else {
            // Proceder con el registro
            const user = { username, password, dni };
            fetch("http://localhost:8080/user/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user),
            })
            .then(response => response.json())
            .then((registeredUser) => {
                console.log("Se registró correctamente el usuario", registeredUser);
                navigate('/home');
            })
            .catch((error) => {
                console.error("Error en la solicitud:", error);
            });
        }
    };

    return (
        <div className="login-container">
            <h2>Registrarse</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="username">Nombre de Usuario:</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="dni">DNI:</label>
                    <input
                        type="text"
                        id="dni"
                        value={dni}
                        onChange={(e) => setDni(e.target.value)}
                        required
                    />
                </div>

                {errorMessage && <p style={{ color: 'red' }}>{errorMessage}</p>}

                <button type="submit" className="btn">Registrarse</button>
            </form>
        </div>
    );
}

export default Register;
