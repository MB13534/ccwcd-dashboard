import React, { useState } from "react";
import { Button, useTheme } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import Joyride from "react-joyride";

const AtvHelp = (props) => {
  const theme = useTheme();
  const [run, setRun] = useState(false);

  const steps = [
    {
      title: "Filters",
      content:
        "Use the filters bar to refine the data you would like to view in the table below.",
      target: "#filters",
      disableBeacon: true,
    },
    {
      title: "Save As View",
      content:
        "Use the Save As View button to save your filter selections as a View for easy viewing later.",
      target: "#save-as-view-btn",
      disableBeacon: true,
    },
    {
      title: "More Filters",
      content:
        "Selecting More Filters will open an advanced filters section where you can select the dataset you would like to view as well as refine the period of record. Additionally, your saved views are displayed in the More Filters section and can be loaded by clicking on the view you are interested in.",
      target: "#more-filters-btn",
      disableBeacon: true,
    },
    {
      title: "Filter Records",
      content:
        "You can search across any field in the table using the search box.",
      target: "div.MuiTextField-root:nth-child(3)",
      disableBeacon: true,
    },
    {
      title: "Toggle Columns",
      content:
        "You can control which columns are visible in the table using the column toggle.",
      target:
        ".MTableToolbar-actions-431 > div:nth-child(1) > div:nth-child(1) > span:nth-child(1) > button:nth-child(1)",
      disableBeacon: true,
    },
    {
      title: "Download Data",
      content:
        "You can download the table data. Note that the filters applied to the table will also apply to the data download.",
      target:
        ".MTableToolbar-actions-431 > div:nth-child(1) > div:nth-child(1) > span:nth-child(2) > button:nth-child(1)",
      disableBeacon: true,
    },
    {
      title: "Graph",
      content:
        "The data can additionally be viewed as a graph by selecting the View As Graph button.",
      target: "#view-graph-btn",
      disableBeacon: true,
    },
    {
      title: "View Data Availability",
      content:
        "The View Data Availability button can be used to view a table highlighting when each of your selected stations were last updated.",
      target: "#view-data-availability-btn",
      disableBeacon: true,
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = ["finished", "skipped"];

    if (finishedStatuses.includes(status)) {
      setRun(false);
    }
  };

  return (
    <>
      <Button
        startIcon={<HelpIcon />}
        color="primary"
        size="large"
        onClick={() => setRun((state) => !state)}
      >
        Help
      </Button>
      <Joyride
        // stepIndex={2}
        steps={steps}
        continuous={true}
        showProgress={true}
        showSkipButton={true}
        callback={handleJoyrideCallback}
        run={run}
        styles={{
          options: {
            zIndex: 10000,
            primaryColor: theme.palette.primary.main,
          },
        }}
      />
    </>
  );
};

export default AtvHelp;
