import React from 'react';
import { default as DownloadFormSection } from './DownloadFormSection';
import { CssBaseline, Box } from '@material-ui/core';

/* eslint-disable import/no-anonymous-default-export */
export default {
  title: 'Components/DownloadFormSection',
  component: DownloadFormSection,
  parameters: {
    componentSubtitle: 'Component for rendering a data download form section.',
  },
};

const template = args => (
  <Box bgcolor="#e1e1e1" padding={3}>
    <div>
      <CssBaseline />
      <DownloadFormSection {...args} />
    </div>
  </Box>
);

export const Default = template.bind({});
Default.args = {
  title: 'Data Download',
  text: 'Some example data download instructions.',
};
