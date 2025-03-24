import "./css/Home.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import CryptoChart from "./components/CryptoGraphic.jsx";
import { FaSignOutAlt, FaUser, FaMoneyBillAlt, FaExchangeAlt, FaHistory } from "react-icons/fa";

function Home() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState(null);
    const [chartData, setChartData] = useState({ dates: [], prices: [] });
    const [timeRange, setTimeRange] = useState("7");
    const [selectedCrypto, setSelectedCrypto] = useState("BTC");

    const Exit = () => navigate("/");
    const handleProfile = () => navigate("/home/Profile");
    const handleDeposit = () => navigate("/home/Deposit");
    const handleTransfer = () => navigate("/home/Transfer");
    const handleSummary = () => navigate("/home/Summary");

    useEffect(() => {
        fetchUserData();
        fetchCryptoData();
    }, [timeRange, selectedCrypto]);

    const fetchUserData = async () => {
        try {
            const dni = localStorage.getItem("dni");
            const token = localStorage.getItem("token");
            if (!dni || !token) {
                console.error("DNI o token no encontrado en localStorage");
                return;
            }
            const response = await axios.get(`http://localhost:8080/user/get/${dni}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setUserData(response.data);
        } catch (error) {
            console.error("Error al obtener los datos del usuario", error);
        }
    };

    const fetchCryptoData = async () => {
        console.log("Que crypto me estoy obteniendo ", selectedCrypto);
        try {
            const market = "EUR";
            const token = localStorage.getItem("token");
            if (!token) {
                console.error("Token no encontrado en localStorage");
                return;
            }
            const response = await axios.get(
                `http://localhost:8080/digitalCurrencyDaily?symbol=${selectedCrypto}&market=${market}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            if (response.data && response.data["Time Series (Digital Currency Daily)"]) {
                processCryptoData(response.data);
            } else {
                console.error("Invalid data format received:", response.data);
                setChartData({ dates: [], prices: [] });
            }
        } catch (error) {
            console.error("Error fetching crypto data:", error);
            setChartData({ dates: [], prices: [] });
        }
    };

    const processCryptoData = (data) => {
        const timeSeries = data["Time Series (Digital Currency Daily)"];
        if (!timeSeries) {
            console.error("No time series data available");
            return;
        }

        const dates = Object.keys(timeSeries);
        dates.sort((a, b) => new Date(a) - new Date(b));

        const numDays = parseInt(timeRange);
        const recentDates = dates.slice(Math.max(dates.length - numDays, 0));
        const prices = recentDates.map((date) => {
            const closePrice = timeSeries[date]["4. close"];
            return closePrice ? parseFloat(closePrice) : null;
        }).filter(price => price !== null);

        setChartData({ dates: recentDates, prices: prices });
    };

    const handleCryptoChange = (event) => {
        setSelectedCrypto(event.target.value);
    };

    return (
        <div className="home-container">
            <div className="header-icons">
                <button className="icon-btn" onClick={Exit} title="Salir">
                    <FaSignOutAlt />
                </button>
                <button className="icon-btn" onClick={handleProfile} title="Perfil">
                    <FaUser />
                </button>
                <button className="icon-btn" onClick={handleDeposit} title="Ingresar">
                    <FaMoneyBillAlt />
                </button>
                <button className="icon-btn" onClick={handleTransfer} title="Transferir">
                    <FaExchangeAlt />
                </button>
                <button className="icon-btn" onClick={handleSummary} title="Histórico">
                    <FaHistory />
                </button>
            </div>

            <div className="balance-container">
                {userData && userData.account ? (
                    <div className="balance-info">
                        <p>Numero de cuenta: <strong>{userData.account.number}</strong></p>
                        <p className="balance-amount">Saldo: {userData.account.balance} $</p>
                    </div>
                ) : (
                    <p>Cargando datos...</p>
                )}
            </div>

            <div className="crypto-graphic-container">
                <h1>Mercado Crypto</h1>

                <select value={selectedCrypto} onChange={handleCryptoChange}>
                    <option value="BTC">Bitcoin (BTC)</option>
                    <option value="ETH">Ethereum (ETH)</option>
                    <option value="USDT">Tether (USDT)</option>
                    <option value="SOL">Solana (SOL)</option>
                    <option value="XRP">XRP (XRP)</option>
                    <option value="DOGE">Dogecoin (DOGE)</option>
                    <option value="ADA">Cardano (ADA)</option>
                </select>

                <div className="days-buttons">
                    <button onClick={() => setTimeRange("7")} className={timeRange === "7" ? "active" : ""}>1S</button>
                    <button onClick={() => setTimeRange("30")} className={timeRange === "30" ? "active" : ""}>1M</button>
                    <button onClick={() => setTimeRange("90")} className={timeRange === "90" ? "active" : ""}>3M</button>
                    <button onClick={() => setTimeRange("365")} className={timeRange === "365" ? "active" : ""}>1Y</button>
                </div>
                <CryptoChart dates={chartData.dates} prices={chartData.prices} selectedCrypto={selectedCrypto} />
            </div>
        </div>
    );
}

export default Home;