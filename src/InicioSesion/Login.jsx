import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "/src/css/Login.css";

function Login() {
    const [DNI, setDNI] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [attempts, setAttempts] = useState(0);
    const maxAttempts = 3;
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (attempts >= maxAttempts) {
            alert("Demasiados intentos fallidos. Intenta más tarde.");
            return;
        }

        try {
            const requestBody = JSON.stringify({ dni: DNI.trim(), password });
            console.log("Cuerpo de la solicitud:", requestBody);

            const response = await fetch("http://localhost:8080/user/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: requestBody,
            });

            console.log("Respuesta del servidor:", response);

            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error("Credenciales inválidas");
                } else {
                    throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
            }

            const data = await response.json(); // Parsea la respuesta como JSON
            console.log("Datos recibidos:", data);
            localStorage.setItem("token", data.token); // Accede al token dentro del objeto JSON
            navigate("/home");
        } catch (error) {
            console.error("Error en el login:", error);
            setAttempts((prev) => prev + 1);

            const remainingAttempts = maxAttempts - (attempts + 1);
            if (remainingAttempts > 0) {
                setErrorMessage(`DNI o contraseña incorrectos. Intentos restantes: ${remainingAttempts}`);
            } else {
                alert("Has fallado 3 veces. Redirigiendo a la página de origen.");
                navigate("/");
            }
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="dni">DNI:</label>
                    <input
                        type="text"
                        id="dni"
                        value={DNI}
                        onChange={(e) => setDNI(e.target.value)}
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <div>
                        <input
                            type={showPassword ? "text" : "password"}
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                        <button
                            className="button-eye"
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                        >
                            {showPassword ? <FaEyeSlash size={30} /> : <FaEye size={30} />}
                        </button>
                    </div>
                </div>

                {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

                <button type="submit" className="btn">Login</button>
            </form>
        </div>
    );
}

export default Login;