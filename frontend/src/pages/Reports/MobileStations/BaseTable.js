import React from 'react';
import PropTypes from 'prop-types';
import MaterialTable from 'material-table';

const BaseTable = ({ id, columns, data, isLoading, onRowClick }) => {
  return (
    <MaterialTable
      id={id}
      columns={columns}
      data={data}
      isLoading={isLoading}
      components={{
        Container: props => <div {...props}></div>,
      }}
      options={{
        emptyRowsWhenPaging: false,
        exportAllData: true,
        exportButton: true,
        maxBodyHeight: 400,
        pageSize: 30,
        pageSizeOptions: [15, 30, 60],
        padding: 'dense',
        searchFieldAlignment: 'left',
        showTitle: false,
      }}
      onRowClick={(_, row) => {
        onRowClick(row);
      }}
    />
  );
};

BaseTable.propTypes = {
  id: PropTypes.string,
  columns: PropTypes.arrayOf(PropTypes.object).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onRowClick: PropTypes.func,
};

export default BaseTable;
