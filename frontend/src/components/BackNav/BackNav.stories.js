import React from 'react';
import { default as BackNav } from './BackNav';
import { CssBaseline } from '@material-ui/core';
import { BrowserRouter } from 'react-router-dom';

/* eslint-disable import/no-anonymous-default-export */
export default {
  title: 'Components/BackNav',
  component: BackNav,
  parameters: {
    componentSubtitle: 'Component used to render a back navigation button.',
  },
};

const template = args => (
  <>
    <BrowserRouter>
      <CssBaseline />
      <BackNav {...args} />
    </BrowserRouter>
  </>
);

export const Default = template.bind({});
Default.args = {
  path: '/',
  text: 'Back',
};
