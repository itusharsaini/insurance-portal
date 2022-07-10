import React, { FC, memo, useEffect, useState } from 'react';
import DataTableComponent from "../data-table-component";
import { TableColumn } from "react-data-table-component";
import { useNavigate } from "react-router-dom";

const InsuranceListComponent: FC = memo(() => {
  const [limit, setLimit] = useState<number>(10);
  const [insuranceData, setInsuranceData] = useState([]);
  const [totalRows, setTotalRows] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  let navigate = useNavigate();

  const insuranceTableColumns: TableColumn<any>[] = [
    {
      name: '',
      button: true,
      cell: row =>
        <button type="button" className="btn btn-link" onClick={() => navigate("/insurances/" + row.id)}>Edit</button>,
      allowOverflow: true
    },
    {
      name: 'Policy Id',
      id: 'policy_id',
      selector: row => row.policy_id,
      sortable: true
    },
    {
      name: 'Date of Purchase',
      id: 'date_of_purchase',
      selector: row => row.date_of_purchase,
      sortable: true
    },
    {
      name: 'Customer Id',
      id: 'customer_id',
      selector: row => row.customer_id,
      sortable: true
    },
    {
      name: 'Fuel',
      id: 'fuel',
      selector: row => row.fuel,
      sortable: true
    },
    {
      name: 'Vehicle Segment',
      id: 'vehicle_segment',
      selector: row => row.vehicle_segment,
      sortable: true
    },
    {
      name: 'Premium',
      id: 'premium',
      selector: row => row.premium,
      sortable: true
    },
    {
      name: 'Bodily Injury Liabilty',
      id: 'bodily_injury_liability',
      selector: row => row.bodily_injury_liability,
      sortable: true
    },
    {
      name: 'Personal Injury Protection',
      id: 'personal_injury_protection',
      selector: row => row.personal_injury_protection,
      sortable: true
    },
    {
      name: 'Property Damage Liability',
      id: 'property_damage_liability',
      selector: row => row.property_damage_liability,
      sortable: true
    },
    {
      name: 'Collision',
      id: 'collision',
      selector: row => row.collision,
      sortable: true
    },
    {
      name: 'Comprehensive',
      id: 'comprehensive',
      selector: row => row.comprehensive,
      sortable: true
    },
    {
      name: 'Gender',
      id: 'gender',
      selector: row => row.gender,
      sortable: true
    },
    {
      name: 'Income Group',
      id: 'income_group',
      selector: row => row.income_group,
      sortable: true
    },
    {
      name: 'Region',
      id: 'region',
      selector: row => row.region,
      sortable: true
    },
    {
      name: 'Marital Status',
      id: 'marital_status',
      selector: row => row.marital_status,
      sortable: true
    }
  ];

  const getData = async (page: number = 1) => {
    setLoading(true);
    const response = await fetch(`http://localhost:3001/policies/?limit=${limit}&offset=${(page * limit) - limit}`);
    const data = await response.json();
    if (data && Object.keys(data)?.length && data?.data?.length) {
      setInsuranceData(data.data);
      setTotalRows(data.totalRecords);
    } else {
      setInsuranceData([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getData(1).catch();
  }, []);

  const handlePageChanges = async (page: number) => {
    getData(page).catch();
  };

  return <DataTableComponent data={insuranceData} columns={insuranceTableColumns} handlePageChanges={handlePageChanges} totalRows={totalRows} setLimit={setLimit} loading={loading}/>;
});

export default InsuranceListComponent;
