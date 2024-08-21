import "./App.css";
import { Router, useHistory } from 'react-router-dom'
import NavBar from "./components/NavBar";
import Login from "./Login"

//holaaaa
export function App() {
  // Función para cerrar la ventana pero no funciona del todo
  const handleExit = () => {
    window.close();
  };

  const goLogin = () => {
    return(
        <div className="">
            <Router>
                <NavBar/>
                <Routes>
                    <Route path="/Login" element={<Login/>}/>
                </Routes>
            </Router>
        </div>

    );
  };

  return (
    <div>
      <h1>HOLA</h1>
      <h2>Adio</h2>
      <div className="button-container">
        <button className="btn" onClick={handleExit}>Salir</button>
        <button className="btn" onClick={goLogin}>Login</button>
        <button className="btn">Registro</button>
      </div>
    </div>
  );
}
