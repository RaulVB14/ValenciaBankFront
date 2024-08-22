import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const [DNI, setDNI] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [attempts, setAttempts] = useState(0);
  const maxAttempts = 3;
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = { dni: DNI, password: password };

    fetch("http://localhost:8080/user/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(user),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid credentials");
        }
        return response.json();
      })
      .then((data) => {
        if (data) {
          console.log("Login correcto", data);
          navigate("/home");
        }
      })
      .catch((error) => {
        console.error("Error en el login:", error);
        const newAttempts = attempts + 1;
        setAttempts(newAttempts);

        const remainingAttempts = maxAttempts - newAttempts;
        if (remainingAttempts > 0) {
          setErrorMessage(
            `DNI o contraseña incorrectos. Te quedan ${remainingAttempts} intento(s).`
          );
        } else {
          alert("Has fallado 3 veces. Redirigiendo a la página de origen.");
          navigate("/");
        }
      });
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
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

        <button type="submit" className="btn">
          Login
        </button>
      </form>
    </div>
  );
}

export default Login;
