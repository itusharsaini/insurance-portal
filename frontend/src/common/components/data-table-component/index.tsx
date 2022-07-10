import React, { FC, memo } from 'react';
import DataTable, { TableColumn } from 'react-data-table-component';

interface Props {
  data: any[];
  columns: TableColumn<any>[];
  handlePageChanges: (page: number) => void;
  loading: boolean;
  totalRows: number;
  setLimit: (limit: number) => void;
}

const DataTableComponent: FC<Props> = memo(({data, columns, handlePageChanges, loading = false, totalRows, setLimit}) => {

  return <DataTable
    title={'Insurances'}
    responsive={true}
    fixedHeader={true}
    fixedHeaderScrollHeight={'90vh'}
    columns={columns}
    data={data}
    pagination
    progressPending={loading}
    progressComponent={<small>Loading...</small>}
    // subHeader
    // subHeaderComponent={<FilterComponent onFilter={(e)=> {return}} onClear={()=>{return}} filerText={undefined}/>}
    persistTableHead
    paginationServer
    onChangePage={handlePageChanges}
    paginationTotalRows={totalRows}
    onChangeRowsPerPage={(newPerPage, page) => setLimit(newPerPage)}
  />;
});

export default DataTableComponent;
