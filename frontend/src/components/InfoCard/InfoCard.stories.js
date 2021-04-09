import React from 'react';
import { default as InfoCard } from './InfoCard';
import { CssBaseline, Typography } from '@material-ui/core';

export default {
  title: 'Components/InfoCard',
  component: InfoCard,
  parameters: {
    componentSubtitle: 'Component used to render an information alert block.',
  },
};

export const Default = () => (
  <>
    <CssBaseline />
    <InfoCard>
      <Typography variant="body1">
        There were issues found with recharge slices for the following month and year combinations. To resolve issues,
        select a month and year combination below and then resolve any URF or Splits issues in the table below.
      </Typography>
    </InfoCard>
  </>
);
