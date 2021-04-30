import React from 'react';
import { default as ChipNav } from './ChipNav';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

/* eslint-disable import/no-anonymous-default-export */
export default {
  title: 'Components/ChipNav',
  component: ChipNav,
  parameters: {
    componentSubtitle:
      'Component for rendering a chip navigation bar. The ChipNav component can be useful for rendering a list of related links.',
  },
};

const MenuItems = [
  { id: 1, title: 'Edit Projects', path: '/item-1' },
  { id: 2, title: 'Edit Structures', path: '/item-2' },
  { id: 3, title: 'Edit Sources', path: '/item-3' },
];

const Template = args => (
  <div>
    <CssBaseline />
    <BrowserRouter>
      <ChipNav {...args} />;
    </BrowserRouter>
  </div>
);

export const Default = Template.bind({});
Default.args = {
  title: 'Related Tables',
  menuItems: MenuItems,
};
