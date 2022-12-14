import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Paper, Chip } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Flex } from "../Flex";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  rootDefault: {
    padding: theme.spacing(2),
  },
  rootSuccess: {
    padding: theme.spacing(2),
    backgroundColor: "#6C63FF",
    color: "#ffffff",
  },
  rootError: {
    padding: theme.spacing(2),
    backgroundColor: "#EA4C89",
    color: "#ffffff",
  },
  linkChip: {
    backgroundColor: (props) =>
      props.state === "default" ? "default" : "rgba(255,255,255,0.1)",
    color: (props) =>
      props.state === "default" ? theme.palette.primary.main : "#ffffff",
    borderColor: (props) =>
      props.state === "default" ? theme.palette.primary.main : "#ffffff",
    margin: theme.spacing(0, 1, 1, 0),
    "&:hover": {
      cursor: "pointer",
      backgroundColor: (props) =>
        props.state === "default" ? "default" : "rgba(255,255,255,0.25)",
    },
  },
  illustrationWrapper: {
    maxWidth: 135,
    "& img": {
      maxWidth: "100%",
    },
    marginLeft: theme.spacing(1),
  },
}));

const LinkChip = ({ state, title, link }) => {
  const classes = useStyles({ state });
  return (
    <Chip
      label={title}
      component={Link}
      to={link}
      variant="outlined"
      color={state === "default" ? "primary" : "default"}
      className={classes.linkChip}
    />
  );
};

LinkChip.propTypes = {
  title: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired,
};

const ActionChip = ({ state, title, onClick }) => {
  const classes = useStyles({ state });
  return (
    <Chip
      label={title}
      variant="outlined"
      color={state === "default" ? "primary" : "default"}
      className={classes.linkChip}
      onClick={onClick}
    />
  );
};

ActionChip.propTypes = {
  title: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  state: PropTypes.string.isRequired,
};

const CardIllustration = ({ illustration }) => {
  const classes = useStyles();
  return (
    <div className={classes.illustrationWrapper}>
      <img src={illustration} alt="Rollup illustration" />
    </div>
  );
};

const RollupCard = ({
  title,
  message,
  state = "default",
  loading = false,
  links = [],
  actions = [],
  illustration,
  ...other
}) => {
  const classes = useStyles();

  const setClass = (state) => {
    if (state === "error") {
      return classes.rootError;
    } else if (state === "success") {
      return classes.rootSuccess;
    }
    return classes.rootDefault;
  };

  if (loading) {
    return <Skeleton variant="rect" height={175} animation="wave" />;
  }

  return (
    <Paper className={setClass(state)} {...other}>
      <Flex justifyContent="space-between" alignItems="start">
        <div>
          <Typography variant="h6" gutterBottom>
            {title}
          </Typography>
          <Typography variant="body1" paragraph>
            {message}
          </Typography>
        </div>
        {illustration && <CardIllustration illustration={illustration} />}
      </Flex>
      {links.map(({ title, path }) => (
        <LinkChip key={title} title={title} link={path} state={state} />
      ))}
      {actions.map(({ title, onClick }) => (
        <ActionChip key={title} title={title} onClick={onClick} state={state} />
      ))}
    </Paper>
  );
};

RollupCard.propTypes = {
  /**
   * A title for the rollup card
   */
  title: PropTypes.string,
  /**
   * A message for the rollup card
   */
  message: PropTypes.string,
  /**
   * The current state of the rollup card
   */
  state: PropTypes.oneOf(["success", "error", "default"]),
  /**
   * Whether the content of the card is currently loading. Useful
   * for asynchronous use cases
   */
  loading: PropTypes.bool,
  /**
   * Navigation links for the rollup card. A LinkChip
   * component will be rendered for each link.
   */
  links: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ),
  /**
   * Actions for the rollup card. An ActionChip
   * component will be rendered for each action
   * and the provided onClick method will
   * run when the associated chip is clicked
   */
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      onClick: PropTypes.func.isRequired,
    })
  ),
  /**
   * An optional illustration to include on the card
   */
  illustration: PropTypes.node,
};

export default RollupCard;
