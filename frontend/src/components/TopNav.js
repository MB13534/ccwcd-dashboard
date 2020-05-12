import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, AppBar, Toolbar, Divider, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    flexGrow: 1,
  },
  activeLink: {
    color: theme.palette.primary.main,
    fontWeight: 600,
    // fontSize: 17,
    margin: theme.spacing(0.5),
    padding: theme.spacing(1),
    borderRadius: 4,
    textDecoration: `none`,
    "&:hover": {
      backgroundColor: `#e9e9e9`,
      textDecoration: `none`,
    },
  },
  link: {
    // fontSize: 17,
    color: "#777777",
    margin: theme.spacing(0.5),
    padding: theme.spacing(1),
    borderRadius: 4,
    textDecoration: `none`,
    "&:hover": {
      backgroundColor: "#e9e9e9",
      textDecoration: `none`,
    },
  },
}));

const TopNav = ({ title, menuItems, ...other }) => {
  const classes = useStyles();
  let history = useHistory();

  /**
   * utility function used to check
   * if a menu item is active or not
   * @param {*} url
   */
  const checkActive = (history, url, exact) => {
    console.log(url);
    if (exact) {
      if (history.location.pathname === url) {
        return true;
      }
      return false;
    } else {
      if (history.location.pathname.includes(url)) {
        return true;
      }
      return false;
    }
  };

  /**
   * Assign appropriate class name to menu item based
   * on if menu item is active or not
   * @param {*} url
   */
  const handleActive = (url, exact) => {
    const active = checkActive(history, url, exact);
    if (active) {
      return classes.activeLink;
    }
    return classes.link;
  };

  return (
    <AppBar
      position="static"
      color="transparent"
      className={classes.root}
      elevation={0}
      {...other}
    >
      <Toolbar>
        <Typography variant="h6" color="primary" className={classes.title}>
          {title}
        </Typography>
        {menuItems.map((item) => (
          <Link
            key={item.id}
            component={RouterLink}
            to={item.path}
            className={handleActive(item.path, item.exact)}
          >
            {item.title}
          </Link>
        ))}
      </Toolbar>
      <Divider />
    </AppBar>
  );
};

TopNav.propTypes = {
  /**
   * The site title to be displayed in the navigation bar.
   */
  title: PropTypes.string.isRequired,
  /**
   * An array of navigation menu items
   */
  menuItems: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      title: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default TopNav;
