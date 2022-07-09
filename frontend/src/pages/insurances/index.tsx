import React, { FC, memo } from 'react';
import withTitle from "../../common/layouts/title-layout";
import InsuranceListComponent from "../../common/components/insurance-list-component";

const InsurancesPage: FC = memo(() => <InsuranceListComponent/>);

const Insurances = withTitle({Component: InsurancesPage, title: 'Insurances'});
export default Insurances;
