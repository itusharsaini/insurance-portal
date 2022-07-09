import React, { FC, memo } from 'react';
import ChartComponent from "../chart-component";

interface Props {}

const DashboardComponent: FC<Props> = memo(() => {
  return <ChartComponent/>;
});

export default DashboardComponent;
