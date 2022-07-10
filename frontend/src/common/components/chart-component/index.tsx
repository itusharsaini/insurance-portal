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
  BarElement, ChartData
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

interface Props{
  chartData: ChartData<"bar">;
}

const ChartComponent: FC<Props> = memo(({chartData}) => {
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


  return <Bar options={options} data={chartData} updateMode={"resize"}/>;
});

export default ChartComponent;
