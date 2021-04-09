import React from 'react';
import { default as BackNav } from './BackNav';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Components/BackNav',
  component: BackNav,
  parameters: {
    componentSubtitle: 'Component used to render a back navigation button.',
  },
};

export const Default = () => (
  <>
    <BrowserRouter>
      <CssBaseline />
      <BackNav title="Return" path="/" />
    </BrowserRouter>
  </>
);
