import React from 'react';
import { Card } from 'antd';
import { Line } from 'react-chartjs-2';
import useWindowSize from "../hooks/useWindowSize";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  LineElement,
  Tooltip,
  Legend,
  Filler,
  } from 'chart.js';
  
  ChartJS.register(
  CategoryScale,
  LinearScale,
  Title,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
  Filler
  );

const HomeLinechart = () => {
  const { width } = useWindowSize();

    const options = {
        responsive: true,
        scales: {
          y:
            {
              ticks: {
                beginAtZero: true
              },
            },
        },
      };
      
      const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      
      const data = {
        labels,
        datasets: [
          {
            label: 'YoY Crypto Investment',
            data: [{x: 'Jan', y:200},{x: 'Feb', y:400},{x: 'Mar', y:0},{x: 'Apr', y:200},{x: 'May', y:100},{x: 'Jun', y:300},{x: 'Jul', y:100},{x: 'Aug', y:400},{x: 'Sep', y:800},{x: 'Oct', y:600},{x: 'Nov', y:700},{x: 'Dec', y:500},],
            borderColor:'rgba(228,76,242,1)',
            backgroundColor: 'rgba(228,76,242,0.2)',
            fill: true,
            tension: 0.4,
          },
          {
            label: 'YoY NFT Investment',
            data: [{x: 'Jan', y:0},{x: 'Feb', y:100},{x: 'Mar', y:0},{x: 'Apr', y:500},{x: 'May', y:900},{x: 'Jun', y:600},{x: 'Jul', y:700},{x: 'Aug', y:400},{x: 'Sep', y:600},{x: 'Oct', y:400},{x: 'Nov', y:200},{x: 'Dec', y:800},],
            borderColor:'rgba(76,221,242,1)',
            backgroundColor: 'rgba(76,221,242,0.2)',
            fill: true,
            tension: 0.4,
          }
        ],
      };
      
      return (
          <>
            <Card className="home-chart-card" style={{width: '390px', height: width > 1100 ? '180px' : '210px'}}>
              <Line options={options} data={data}/>
            </Card>
          </>
      );
};

export default HomeLinechart;
