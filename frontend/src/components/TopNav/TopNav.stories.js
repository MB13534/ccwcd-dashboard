import React from 'react';
import { default as TopNav } from './TopNav';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline } from '@material-ui/core';

/* eslint-disable import/no-anonymous-default-export */
export default {
  title: 'Components/TopNav',
  parameters: {
    component: TopNav,
    componentSubtitle: 'Component for rendering a top navigation bar',
  },
};

const MenuItems = [
  { id: 1, title: 'Item 1', path: '/item-1' },
  { id: 2, title: 'Item 2', path: '/item-2' },
  { id: 3, title: 'Item 3', path: '/item-3' },
];

const NestedItems = [
  { id: 1, title: 'Item 1', path: '/item-1' },
  {
    id: 2,
    title: 'Item 2',
    path: '/item-2',
    children: [
      { id: 11, title: 'Item 2a', path: '/item-2-a' },
      { id: 11, title: 'Item 2b', path: '/item-2-b' },
      { id: 11, title: 'Item 2c', path: '/item-2-c' },
    ],
  },
  { id: 3, title: 'Item 3', path: '/item-3' },
];

const template = args => (
  <div>
    <CssBaseline />
    <BrowserRouter>
      <TopNav {...args} />
    </BrowserRouter>
  </div>
);

export const Default = template.bind({});
Default.args = {
  title: 'CCWCD Dashboard',
  menuItems: MenuItems,
};

export const NestedMenuItems = template.bind({});
NestedMenuItems.args = {
  title: 'CCWCD Dashboard',
  menuItems: NestedItems,
};
