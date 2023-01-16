import React from 'react';
import { Card } from 'antd';
import { Doughnut } from 'react-chartjs-2';
import useWindowSize from "../hooks/useWindowSize";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  } from 'chart.js';
  
  ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  );

  const data = {
    type: 'doughnut',
    labels: ["NFT", "BTC", "ETH", "LTC"],
    datasets: [
      {
        label: 'Investments',
        data: [60, 20, 15, 5],
        backgroundColor: [
          'rgba(228,76,242,0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      }
    ],
  };
  

const HomeDonut = () => {
  const { width } = useWindowSize();

  return (
    <>
      <Card className="home-donut-card" style={{width: width > 1100 ? '185px' : '170px', height: width > 1100 ? '180px' : '210px'}}>
        <Doughnut data={data}/>
      </Card> 
    </>
  )
}

export default HomeDonut