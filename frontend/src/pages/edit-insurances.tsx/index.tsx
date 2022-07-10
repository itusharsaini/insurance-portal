import React, { FC, memo } from 'react';
import withTitle from "../../common/layouts/title-layout";
import InsuranceEditComponent from "../../common/components/insurance-edit-component";

const InsurancesEditPage: FC = memo(() => <InsuranceEditComponent/>);

const InsuranceEdit = withTitle({Component: InsurancesEditPage, title: 'Edit'});
export default InsuranceEdit;
