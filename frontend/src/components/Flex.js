import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    justifyContent: (props) => props.justifyContent,
    alignItems: (props) => props.alignItems,
  },
}));

const Flex = ({
  children,
  alignItems = "center",
  justifyContent = "flex-start",
}) => {
  const classes = useStyles({ alignItems, justifyContent });
  return <div className={classes.root}>{children}</div>;
};

export default Flex;
