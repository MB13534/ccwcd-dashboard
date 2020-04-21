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
        "Use the filters bar to refine the data you would like to view in the table below. You can save your filter selections as a view for easy viewing later. Selecting More Filters will allow to apply advanced filters as well as view and select any views you have already created.",
      target: "#filters",
      disableBeacon: true,
    },
    {
      title: "Table",
      content:
        "The table will display the data you have requested using the filters bar. You can sort by any field by clicking on the column header. The table can filtered further by selecting the Filter Records button or the Toggle Columns button. Additionally, you can exclude records where every value is null. Lastly, you can download the table data by selecting the Download Data button.",
      target: "#table",
      disableBeacon: true,
    },
    {
      title: "Graph",
      content:
        "The data can additionally be viewed as a graph by selecting the View As Graph button.",
      target: "#view-graph-btn",
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
        style={{ marginLeft: theme.spacing(2) }}
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
