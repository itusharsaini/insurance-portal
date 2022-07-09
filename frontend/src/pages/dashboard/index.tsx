import React, { FC, memo } from 'react';
import DashboardComponent from "../../common/components/dashboard-component";
import withTitle from "../../common/layouts/title-layout";

const DashboardPage: FC = memo(() => <DashboardComponent/>);

const Dashboard = withTitle({Component: DashboardPage, title: 'Dashboard'});
export default Dashboard;
