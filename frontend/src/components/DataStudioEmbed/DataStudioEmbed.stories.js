import React from 'react';
import { default as DataStudioEmbed } from './DataStudioEmbed';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

/* eslint-disable import/no-anonymous-default-export */
export default {
  title: 'Components/DataStudioEmbed',
  component: DataStudioEmbed,
  parameters: {
    componentSubtitle: 'Component for rendering an iframed Google Data Studio Report.',
  },
};

const Template = args => (
  <div>
    <CssBaseline />
    <BrowserRouter>
      <DataStudioEmbed {...args} />;
    </BrowserRouter>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  src: 'https://datastudio.google.com/embed/reporting/0faad57b-bd1d-463d-9dcb-1cb308acf050/page/aws5B',
  title: 'Example GDS Embed',
  width: '100%',
  height: 900,
};
