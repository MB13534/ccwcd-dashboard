import React, { useState } from "react";
import PropTypes from "prop-types";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import IconButton from "@material-ui/core/IconButton";
import HomeIcon from "@material-ui/icons/Home";
import DocsIcon from "@material-ui/icons/Book";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import DashboardIcon from "@material-ui/icons/Dashboard";
import AccountIcon from "@material-ui/icons/AccountCircle";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";

import logo from "../images/ccwcd_logo.png";
import { useAuth0 } from "../hooks/auth";

const drawerWidth = 270;

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  toolbar: {
    textAlign: "center",
    padding: theme.spacing(4, 0),
    backgroundColor: "#ffffff",
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    overflow: `auto!important`,
    backgroundColor: theme.palette.primary.main,
    borderRight: "1px solid #ddd",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    maxWidth: 160,
  },
  nav: {
    color: `#ffffff`,
  },
  navIcon: {
    color: `#ffffff`,
  },
  navText: {
    "& span": {
      fontSize: `18px!important`,
    },
  },
});

const Sidebar = props => {
  const { history, classes, theme, container } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // function for naviating to a specific page in the app
  const goTo = route => {
    history.push(`/${route}`);
    localStorage.setItem("last_url", history.location.pathname);
  };

  const setActive = route => {
    if (history.location.pathname.includes(route) && route !== "/") {
      return true;
    } else if (route === "/" && history.location.pathname === "/") {
      return true;
    }
    return false;
  };

  // Configure sidebar menu items
  const MenuItems = [
    {
      link: "",
      title: "Home",
      activePath: "/",
      icon: HomeIcon,
      loginRequired: false,
    },
    {
      link: "admin/data/structures",
      title: "Data Management",
      activePath: "admin/data",
      icon: DashboardIcon,
      loginRequired: true,
    },
    {
      link: "docs/overview",
      title: "Docs",
      activePath: "docs",
      icon: DocsIcon,
      loginRequired: true,
      rolesRequired: "LRE Admin",
    },
    {
      link: "all-things-viewer",
      title: "All Things Viewer",
      activePath: "all-things-viewer",
      icon: DashboardIcon,
      loginRequired: true,
    },
    {
      link: "reports",
      title: "Reports",
      activePath: "reports",
      icon: DashboardIcon,
      loginRequired: true,
    },
    {
      link: "auth0-sync",
      title: "User Management",
      activePath: "auth0-sync",
      icon: DashboardIcon,
      loginRequired: true,
    },
  ];

  const returnMenuItem = (item, isAuthenticated, user) => {
    const li = (
      <ListItem
        button
        onClick={() => goTo(item.link)}
        selected={setActive(item.activePath)}
        key={item.title}
      >
        <ListItemIcon className={classes.navIcon}>
          <item.icon />
        </ListItemIcon>
        <ListItemText className={classes.navText} primary={item.title} />
      </ListItem>
    );

    if (item.loginRequired && item.rolesRequired) {
      if (
        isAuthenticated &&
        user["https://ccwcd2.org/roles"].includes(item.rolesRequired)
      ) {
        return li;
      }
    } else if (item.loginRequired) {
      if (isAuthenticated) {
        return li;
      }
    } else {
      return li;
    }
  };

  const drawer = (
    <div id="sidebar">
      <div className={classes.toolbar}>
        <img src={logo} className={classes.logo} alt="Logo" />
      </div>
      <List className={classes.nav}>
        {MenuItems.map(item => returnMenuItem(item, isAuthenticated, user))}
        {isAuthenticated ? (
          <ListItem button>
            <ListItemIcon className={classes.navIcon}>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.navText}
              primary="Logout"
              onClick={() => logout()}
            />
          </ListItem>
        ) : (
          <ListItem button>
            <ListItemIcon className={classes.navIcon}>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText
              className={classes.navText}
              primary="Login"
              onClick={() => loginWithRedirect()}
            />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        ></IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          Responsive drawer
        </Typography>
      </Toolbar>
      <nav className={classes.drawer}>
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </div>
  );
};

Sidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Sidebar);
