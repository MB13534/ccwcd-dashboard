import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Typography, Box, Chip, Link } from '@material-ui/core';
import BaseTable from './BaseTable';
import useFetchData from '../../../hooks/useFetchData';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import MaterialTable from 'material-table';
import Loading from '../../../components/Loading';
import loading from '../../../images/loading.svg';

const useStyles = makeStyles((theme) => ({
  chipActive: {

  },
  chipInactive: {
    backgroundColor: '#ccc'
  },
  chip: {
    margin: '0 1px',
    '& span': {
      padding: '0 8px',
    }
  },
  loading: {
    position: 'relative',
    width: '150px',
    height: '150px',
    margin: '0 auto',
    padding: '20px',
    boxSizing: 'border-box',
  }
}));

const columns = [
  { title: 'Station', field: 'station_name', width: '100%', },
  { title: 'Value', field: 'last_value_received' },
//  { title: 'Target', field: 'target_value' },
  //{ title: 'Type', field: 'type_chip' },
];

const LastReportTable = ({ data, activeRow, isLoading, onRowClick, onTypeChange }) => {
  const [TypeChips] = useFetchData(
    'mobile-stations/last-report-types',
    [],
  );
  const classes = useStyles();
  const [selectedChips, setSelectedChips] = useState([]);

  useEffect(() => {
    setSelectedChips([...TypeChips.map(x => x.type_chip)]);
  }, [TypeChips]);

  const toggleChip = (type) => {
    let myTypes = [...selectedChips];
    if (myTypes.filter(x => x === type).length > 0) {
      myTypes = myTypes.filter(x => x !== type);
    } else {
      myTypes.push(type);
    }
    setSelectedChips(myTypes);
    onTypeChange(myTypes);
  };

  return (
    <Box style={{textAlign: 'center'}}>
      {activeRow?.por_end && (
        <Box mb={2}>
          <Typography variant="body1" color="textSecondary">
            Last Updated At: {activeRow?.por_end}
          </Typography>
        </Box>
      )}
      {TypeChips.map((x) => (
        <Link key={x.type_chip} onClick={() => {toggleChip(x.type_chip)}} underline={'none'}>
          <Chip label={x.type_chip} color="primary" className={clsx(classes.chip, selectedChips.indexOf(x.type_chip) !== -1 ? classes.chipActive : classes.chipInactive)} />
        </Link>
      ))}
      {((!data?.length > 0 && !isLoading) || selectedChips.length === 0) && (
        <Typography variant="body1" style={{marginTop:'12px'}}>No data could be found for the selected stations and/or types.</Typography>
      )}
      {isLoading && (
        <div className={classes.loading}><img src={loading} alt="loading" /></div>
      )}
      {data?.length > 0 && !isLoading && selectedChips.length > 0 && (
        <MaterialTable
          id={'last-report-table'}
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
            search: true,
          }}
          onRowClick={(_, row) => {
            onRowClick(row);
          }}
        />
      )}
    </Box>
  );
};

LastReportTable.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeRow: PropTypes.object,
  isLoading: PropTypes.bool,
  onRowClick: PropTypes.func.isRequired,
};

export default LastReportTable;
