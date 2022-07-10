import React, { ChangeEvent, FC, memo } from 'react';

interface Props {
  filerText: string | undefined;
  onFilter: (e: ChangeEvent) => void;
  onClear: () => void;
}

const FilterComponent: FC<Props> = memo(({filerText, onFilter, onClear}) => {

  return (
    <div>
      <input type="text" placeholder={'Search by Policy Id or Customer Id'} onChange={onFilter} value={filerText}/>
      <span><button onClick={onClear}>Clear</button></span>
    </div>
  );

});

export default FilterComponent;
