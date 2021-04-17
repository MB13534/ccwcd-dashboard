import React, { useState } from 'react';
import { CssBaseline } from '@material-ui/core';
import ItemSummaryDrawer from './ItemSummaryDrawer';
import { BrowserRouter } from 'react-router-dom';

const data = [
  { ndx: 1, display: 'Item 1', group: 'Group A', project: 'Project A' },
  { ndx: 2, display: 'Item 2', group: 'Group A', project: 'Project A' },
  { ndx: 3, display: 'Item 3', group: 'Group B', project: 'Project B' },
  { ndx: 4, display: 'Item 4', group: 'Group B', project: 'Project B' },
  { ndx: 5, display: 'Item 5', group: 'Group C', project: 'Project C' },
  { ndx: 6, display: 'Item 6', group: 'Group C', project: 'Project C' },
];

let activeItem = { ...data[3] };

const handleChange = event => {
  const { value } = event.target;
  const newActiveItem = data.find(d => d.ndx === value);
  activeItem = newActiveItem;
};

/* eslint-disable import/no-anonymous-default-export */
export default {
  title: 'Components/ItemSummaryDrawer',
  component: ItemSummaryDrawer,
  parameters: {
    componentSubtitle:
      'Component for rendering a item summary drawer. An item summary drawer provides high level details about an item. Common use cases include data drilldown pages such as the Manage Water Slices sub pages.',
  },
};

const template = args => (
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
      <ItemSummaryDrawer {...args} />
    </BrowserRouter>
  </React.Fragment>
);

export const Default = template.bind({});
Default.args = {
  items: data,
  activeItem: activeItem,
  itemSelect: {
    valueField: 'ndx',
    displayField: 'display',
    label: 'Items',
  },
  columns: [
    { title: 'Name', field: 'display' },
    { title: 'Project', field: 'project' },
    { title: 'Group', field: 'group' },
  ],
  previousPath: '/',
  onChange: handleChange,
};
