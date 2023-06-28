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

  

const HomeDonut = ({assets}) => {
  const { width } = useWindowSize();

  const labels = assets.map((item) => item.token);
  const values = assets.map((item) => item.amount * item.price);

  const data = {
    type: 'doughnut',
    labels: labels,
    datasets: [
      {
        label: 'Investments',
        data: values,
        backgroundColor: [
          'rgba(228,76,242,0.2)',
          'rgba(240,248,255, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(0, 255, 0, 0.2)',
          'rgba(0, 0, 255, 0.2)',
          'rgba(220,105,52, 0.5)',

        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(240,248,255, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(0, 255, 0, 1)',
          'rgba(0, 0, 255, 1)',
          'rgba(220,105,52, 1)',

        ],
        borderWidth: 1,
      }
    ],
  };
  

  return (
    <>
    {/* <Card className="home-donut-card" style={{width: width > 1100 ? '185px' : '170px', height: width > 1100 ? '180px' : '210px'}}> */}
      <Card className="sidebar-donut-card">
        <Doughnut data={data}/>
      </Card> 
    </>
  )
}

export default HomeDonut