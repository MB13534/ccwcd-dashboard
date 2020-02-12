import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Chip } from "@material-ui/core";
import useFetchData from "../../hooks/useFetchData";
import { goTo } from "../../util";

const useStyles = makeStyles(theme => ({
  savedViews: {
    margin: theme.spacing(2),
  },
  chipCloud: {
    width: "100%",
  },
  chip: {
    margin: theme.spacing(0, 1, 1, 0),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const SavedViews = props => {
  const classes = useStyles();
  let history = useHistory();
  let match = useRouteMatch();
  const [savedViews] = useFetchData("atv/views", [match]);

  const handleSelectView = chip => {
    const pathSplit = match.path.split("/:viewNdx")[0];
    const pathTrimmed = pathSplit.substring(1, pathSplit.length);
    goTo(history, `${pathTrimmed}/${chip.view_ndx}`);
  };

  return (
    <div className={classes.savedViews}>
      <Typography variant="h6" gutterBottom>
        Saved Views
      </Typography>
      <div className={classes.chipCloud}>
        {savedViews.length === 0 && "None"}
        {savedViews.map(chip => (
          <Chip
            key={chip.view_ndx}
            label={chip.view_name}
            className={classes.chip}
            onClick={() => handleSelectView(chip)}
          />
        ))}
      </div>
    </div>
  );
};

export default SavedViews;
