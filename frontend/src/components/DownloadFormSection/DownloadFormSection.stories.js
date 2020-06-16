import React from "react";
import { default as DownloadFormSection } from "./DownloadFormSection";
import { CssBaseline, Box } from "@material-ui/core";

export default {
  title: "Components/DownloadFormSection",
  parameters: {
    component: DownloadFormSection,
    componentSubtitle: "Component for rendering a data download form section.",
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
    <DownloadFormSection
      title="Data Download"
      text="Some example data download instructions."
    />
  </div>
);
