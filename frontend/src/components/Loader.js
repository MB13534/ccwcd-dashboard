import React from 'react';

import { CircularProgress } from '@material-ui/core';

const style = {
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  minHeight: '100%',
};

function Loader() {
  return (
    <div style={style}>
      <CircularProgress m={2} color="secondary" />
    </div>
  );
}

export default Loader;
