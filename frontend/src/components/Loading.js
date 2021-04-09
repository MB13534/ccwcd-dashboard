import React, { Component } from 'react';
import loading from '../images/loading.svg';

const style = {
  position: 'absolute',
  display: 'flex',
  justifyContent: 'center',
  height: '100vh',
  width: '100vw',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: 'white',
};

const imgStyle = {
  maxWidth: '150px',
};

const Loading = () => (
  <div style={style}>
    <img src={loading} style={imgStyle} alt="loading" />
  </div>
);

export default Loading;
