import React from 'react';
import { default as DownloadForm } from './DownloadForm';
import { CssBaseline, Box } from '@material-ui/core';
import DownloadFormSection from '../DownloadFormSection';
import StructureTypesFilter from '../Filters/StructureTypesFilter';

/* eslint-disable import/no-anonymous-default-export */
export default {
  title: 'Components/DownloadForm',
  component: DownloadForm,
  parameters: {
    componentSubtitle: 'Component for rendering a data download form.',
  },
};

export const Default = () => (
  <Box bgcolor="#e1e1e1" padding={3}>
    <div>
      <CssBaseline />
      <DownloadForm
        data={[]}
        title="Monthly Unlagged Recharge Data Download"
        text="Use the following form to download Monthly Unlagged Recharge Data as csv file."
        onDownload={() => alert('Download!')}
        onSaveView={() => alert('Save view!')}
      >
        <DownloadFormSection
          title="Primary Filters"
          text="Filter the available data by decree(s), project(s), and/or structure(s)."
        >
          <StructureTypesFilter />
          <StructureTypesFilter />
          <StructureTypesFilter />
        </DownloadFormSection>
        <DownloadFormSection title="Secondary Filters">
          <StructureTypesFilter />
          <StructureTypesFilter />
        </DownloadFormSection>
      </DownloadForm>
    </div>
  </Box>
);
