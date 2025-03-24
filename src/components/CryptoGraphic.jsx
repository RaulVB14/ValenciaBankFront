import React, { useEffect, useRef } from "react";
import * as echarts from "echarts";

const CryptoChart = ({ dates, prices, selectedCrypto }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    if (!chartRef.current || dates.length === 0) return;

    const myChart = echarts.init(chartRef.current);

    const option = {
      title: {
        text: `Fluctuación de ${selectedCrypto} (EUR)`, // 📌 Hacemos el título dinámico
        left: "auto",
        right: "120px",
      },
      tooltip: {
        trigger: "axis",
      },
      grid: {
        left: "5%",
        right: "5%",
        bottom: "5%",
        containLabel: true,
      },
      xAxis: {
        type: "category",
        data: dates,
        axisLabel: {
          fontSize: 12,
          fontWeight: "bold",
          color: "#333",
          rotate: 30,
        },
      },
      yAxis: {
        type: "value",
        axisLabel: {
          fontSize: 12,
          fontWeight: "bold",
          color: "#333",
          rotate: 30,
        },
      },
      series: [
        {
          data: prices,
          type: "line",
          smooth: true,
          areaStyle: {},
          color: "#000000",
        },
      ],
    };

    myChart.setOption(option);

    window.addEventListener("resize", myChart.resize);

    return () => {
      window.removeEventListener("resize", myChart.resize);
      myChart.dispose();
    };
  }, [dates, prices, selectedCrypto]); // Agregamos selectedCrypto para actualizar el gráfico

  return <div ref={chartRef} style={{ width: "500px", height: "400px" }} />;
};


export default CryptoChart;
