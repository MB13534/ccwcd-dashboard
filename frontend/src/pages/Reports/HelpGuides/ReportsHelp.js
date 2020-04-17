import React, { useState } from "react";
import { Button, useTheme } from "@material-ui/core";
import HelpIcon from "@material-ui/icons/Help";
import Joyride from "react-joyride";

const ReportsHelp = ({ handleReportSelection }) => {
  const theme = useTheme();
  const [run, setRun] = useState(false);

  const steps = [
    {
      title: "Reports",
      content:
        "Each card in the grid represents a different report on the dashboard. Reports are used to group together data that are related or viewed in similar ways.",
      target: "#report-cards",
      disableBeacon: true,
    },
    {
      title: "Jump To Report",
      content: "You can view a Report by clicking on the Jump To button.",
      target: "#report-jump-to-btn",
      disableBeacon: true,
    },
    {
      title: "Report Details",
      content:
        "You can view details for a report including a description and any Saved Views by clicking on the Details button.",
      target: "#report-details-btn",
      disableBeacon: true,
    },
    {
      title: "Saved Views",
      content:
        "Saved Views are intended to provide a way to save a collection of filter selections for a Report. You can add, edit, view, and delete a Saved View from this details panel.",
      target: "#report-details-drawer",
      disableBeacon: true,
    },
  ];

  const handleJoyrideCallback = (data) => {
    const { status, index } = data;
    const finishedStatuses = ["finished", "skipped"];

    if (index === 3) {
      handleReportSelection();
    }

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

export default ReportsHelp;
