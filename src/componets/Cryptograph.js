import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Line } from "react-chartjs-2";


export default function CryptoGraph() {
    const { cryptoId } = useParams();
    const [historicalData, setHistoricalData] = useState([]);
  
    useEffect(() => {
      const fetchHistoricalData = async () => {
        try {
          const response = await fetch(`https://api.coingecko.com/api/v3/coins/${cryptoId}/market_chart?vs_currency=usd&days=30`);
          if (!response.ok) {
            throw new Error("Failed to fetch historical data");
          }
          const data = await response.json();
          setHistoricalData(data.prices);
          console.log("Fetched historical data:", data.prices);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchHistoricalData();
    }, [cryptoId]);
  
    return (
      <div>
        <h2>Graph for {cryptoId}</h2>
        <Line
          data={{
            labels: historicalData.map((dataPoint) => new Date(dataPoint[0]).toLocaleDateString()),
            datasets: [
              {
                label: "Price",
                data: historicalData.map((dataPoint) => dataPoint[1]),
                backgroundColor: "rgba(75,192,192,0.4)",
                borderColor: "rgba(75,192,192,1)",
                borderWidth: 1,
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            scales: {
              x: {
                display: true,
                title: {
                  display: true,
                  text: "Date",
                },
              },
              y: {
                display: true,
                title: {
                  display: true,
                  text: "Price (USD)",
                },
              },
            },
          }}
        />
      </div>
    );
  };
  