import React from 'react';
import { action } from '@storybook/addon-actions';
import RollupCard from './RollupCard';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, Box } from '@material-ui/core';
import BasicIllustration from '../../images/undraw_personal_settings_kihd.svg';
import ErrorIllustration from '../../images/undraw_alert_mc7b.svg';

/* eslint-disable import/no-anonymous-default-export */
export default {
  title: 'Components/RollupCard',
  component: RollupCard,
  parameters: {
    componentSubtitle:
      'Component for rendering a dashboard rollup card. A dashboard rollup card is intended to provide high level system information. Common use cases include alerts, a description with links to a site section prominently, or to display basic metrics.',
  },
};

const stateOptions = {
  default: 'default',
  success: 'success',
  error: 'error',
};

const links = [{ title: 'Manage Water Slices', path: '/recharge-accounting/water-slices' }];

const actions = [
  {
    title: 'Preview Water Slices',
    onClick: action('Preview Water Slices click'),
  },
];

const template = args => (
  <React.Fragment>
    <CssBaseline />
    <BrowserRouter>
      <RollupCard {...args} />
    </BrowserRouter>
  </React.Fragment>
);

export const Default = template.bind({});
Default.args = {
  title: 'Accounting Rollup',
  message: 'Some filler text about accounting',
  state: 'default',
  links: links,
  style: { width: 600 },
};

export const Actions = template.bind({});
Actions.args = {
  title: 'Accounting Rollup',
  message: 'Some filler text about accounting',
  state: 'default',
  actions: actions,
  style: { width: 600 },
};

export const Illustration = template.bind({});
Illustration.args = {
  title: 'Accounting Rollup',
  message: 'Some filler text about accounting',
  state: 'default',
  links: [],
  illustration: BasicIllustration,
  style: { width: 600 },
};

export const Success = template.bind({});
Success.args = {
  title: 'Woohoo!',
  message: 'We could not find any accounting errors.',
  state: 'success',
  links: [],
  style: { width: 600 },
};

export const Error = template.bind({});
Error.args = {
  title: 'Heads up!',
  message: 'We noticed a couple of flags related to your recharge accounting.',
  state: 'error',
  links: [
    {
      title: 'Fix URF Issues',
      link: '/recharge-accounting/water-slices/urfs',
    },
    {
      title: 'Fix Splits Issues',
      link: '/recharge-accounting/water-slices/splits',
    },
    { title: 'Fix Data Issues', link: '/recharge-accounting/data' },
  ],
  illustration: ErrorIllustration,
  style: { width: 700 },
};
