import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: (props) => props.justifyContent,
    alignItems: (props) => props.alignItems,
  },
}));

/**
 * Component used to display in a row using flexbox.
 * The content can be justified and aligned
 * using component props. Any valid css flexbox value
 * works with this component.
 */
const Flex = ({
  children,
  alignItems = "center",
  justifyContent = "start",
}) => {
  const classes = useStyles({ alignItems, justifyContent });
  return <div className={classes.root}>{children}</div>;
};

Flex.propTypes = {
  /**
   * Any valid flexbox justify-content value
   */
  justifyContent: PropTypes.oneOf([
    "start",
    "end",
    "center",
    "space-between",
    "space-around",
    "space-evenly",
  ]),
  /**
   * Any valid flexbox align-items value
   */
  alignItems: PropTypes.oneOf(["start", "end", "center", "stretch"]),
};

export default Flex;
