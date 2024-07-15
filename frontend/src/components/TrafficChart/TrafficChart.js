// src/components/TrafficChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  ArcElement,
  Tooltip,
  Legend
);

const TrafficChart = () => {
  const data = {
    labels: ['Desktop', 'Tablet', 'Phone'],
    datasets: [
      {
        data: [63, 15, 22],
        backgroundColor: ['#f1f1f1', '#36A2EB', '#FFCE56'],
        hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };

  return <Pie data={data} />;
};

export default TrafficChart;
