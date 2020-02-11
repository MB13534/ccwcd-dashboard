import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Collapse, Button, Divider } from "@material-ui/core";
import TuneIcon from "@material-ui/icons/Tune";
import useVisibility from "../../hooks/useVisibility";

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),
  },
  moreFilters: {
    width: "100%",
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const AdvancedFilters = ({ children }) => {
  const classes = useStyles();
  const [visibility, handleVisibility] = useVisibility(false);

  return (
    <>
      <Button
        color="primary"
        className={classes.margin}
        onClick={handleVisibility}
      >
        <TuneIcon style={{ marginRight: 5 }} />
        {visibility ? "Less Filters" : "More Filters"}
      </Button>
      <Collapse in={visibility} className={classes.moreFilters}>
        <Divider className={classes.divider} />
        {children}
      </Collapse>
    </>
  );
};

AdvancedFilters.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

export default AdvancedFilters;
