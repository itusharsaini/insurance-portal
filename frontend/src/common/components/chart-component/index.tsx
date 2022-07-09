import React, { FC, memo } from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const ChartComponent: FC = memo(() => {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    BarElement
  );

  const options: ChartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top'
      },
      title: {
        display: true,
        position: 'top',
        align: "start",
        text: 'Insurances Sold Per Month'
      }
    }
  };

  const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', "August", "September", "October"];

  const data = {
    labels,
    datasets: [
      {
        label: 'North',
        data: [1, 2, 3, 4, 2, 5, 6, 7, 8, 0],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)'
      },
      {
        label: 'South',
        data: [10, 20, 30, 40, 2, 5, 6, 7, 8, 0],
        borderColor: 'rgb(62,128,255)',
        backgroundColor: 'rgb(29,78,201)'
      }
    ]
  };

  return <Bar options={options} data={data} updateMode={"resize"}/>;
});

export default ChartComponent;
