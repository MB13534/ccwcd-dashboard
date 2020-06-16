import React from "react";
import { default as DownloadForm } from "./DownloadForm";
import { CssBaseline, Box } from "@material-ui/core";
import DownloadFormSection from "../DownloadFormSection";
import StructureTypesFilter from "../Filters/StructureTypesFilter";

export default {
  title: "Components/DownloadForm",
  parameters: {
    component: DownloadForm,
    componentSubtitle: "Component for rendering a data download form.",
  },
  decorators: [
    (storyFn) => (
      <Box bgcolor="#e1e1e1" padding={3}>
        {storyFn()}
      </Box>
    ),
  ],
};

export const Default = () => (
  <div>
    <CssBaseline />
    <DownloadForm
      title="Monthly Unlagged Recharge Data Download"
      text="Use the following form to download Monthly Unlagged Recharge Data as csv file."
      onDownload={() => alert("Download!")}
      onSaveView={() => alert("Save view!")}
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
);
