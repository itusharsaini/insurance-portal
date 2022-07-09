import React, { FC, memo } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

const DataTableComponent: FC = memo(() => {
  const columns: TableColumn<any>[] = [
    {
      name: 'Policy Id',
      id: 'policy_id',
      selector: (row: { title: string; }) => row.title,
      sortable: true
    },
    {
      name: 'Date of Purchase',
      id: 'date_of_purchase',
      selector: (row: { year: string; }) => row.year,
      sortable: true
    },
    {
      name: 'Customer Id',
      id: 'customer_id',
      sortable: true
    },
    {
      name: 'Fuel',
      id: 'fuel',
      sortable: true
    },
    {
      name: 'Vehicle Segment',
      id: 'vehicle_segment',
      sortable: true
    },
    {
      name: 'Premium',
      id: 'premium',
      sortable: true
    },
    {
      name: 'Bodily Injury Liabilty',
      id: 'bodily_injury_liability',
      sortable: true
    },
    {
      name: 'Personal Injury Protection',
      id: 'personal_injury_protection',
      sortable: true
    },
    {
      name: 'Property Damage Liability',
      id: 'property_damage_liability',
      sortable: true
    },
    {
      name: 'Collision',
      id: 'collision',
      sortable: true
    },
    {
      name: 'Comprehensive',
      id: 'comprehensive',
      sortable: true
    },
    {
      name: 'Gender',
      id: 'gender',
      sortable: true
    },
    {
      name: 'Income Group',
      id: 'income_group',
      sortable: true
    },
    {
      name: 'Region',
      id: 'region',
      sortable: true
    },
    {
      name: 'Marital Status',
      id: 'marital_status',
      sortable: true
    }
  ];

  const data = [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988'
    },
    {
      id: 2,
      title: 'Ghostbusters',
      year: '1984'
    }
  ];
  return <DataTable
    title={'Insurances'}
    responsive={true}
    fixedHeader={true}
    fixedHeaderScrollHeight={'90vh'}
    columns={columns}
    data={data}
    pagination
    progressPending={false}
    progressComponent={<small>Loading...</small>}
    subHeader
    subHeaderComponent={ <input style={{width:"100%"}}/>}
    persistTableHead
  />;
});

export default DataTableComponent;
