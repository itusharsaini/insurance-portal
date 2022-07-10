import React, { FC, memo, useEffect, useState } from 'react';
import ChartComponent from "../chart-component";
import { months, regions } from "../../utils";
import { ChartData, ChartDataset } from "chart.js";

const DashboardComponent: FC = memo(() => {
  const [chartData, setChartData] = useState<ChartData<"bar">>({
    labels: [],
    datasets: []
  });

  useEffect(() => {
    getChartData().catch();
  }, []);

  const getChartData = async () => {
    const response = await fetch(`http://localhost:3001/chart/?startDate=2018-01-01&endDate=2018-12-21`);
    const data = await response.json();
    console.log(data);
    const dataset: ChartDataset<"bar">[] = [];
    if (data && Object.keys(data).length) {
      regions.map(reg => {
        const dataArr: number[] = [];
        months.map((mon, i) => {
          dataArr[i] = data[mon][reg];
        });
        const randomColor = Math.floor(Math.random() * 16777215).toString(16);
        dataset.push({
          label: reg.toUpperCase(),
          data: dataArr,
          barThickness: 50,
          borderRadius: 5,
          backgroundColor: `#${randomColor}`
        });
      });
      setChartData({
        labels: months,
        datasets: dataset
      });
    } else {
      setChartData({
        labels: [],
        datasets: []
      });
    }
  };

  return <ChartComponent chartData={chartData}/>;
});

export default DashboardComponent;
