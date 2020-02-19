import React, { useState } from "react";
import { useHistory } from "react-router-dom";
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
import EcoIcon from "@material-ui/icons/Eco";
import UsageIcon from "@material-ui/icons/DataUsage";
import ReportsIcon from "@material-ui/icons/Assignment";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import logo from "../images/ccwcd_logo.png";
import { useAuth0 } from "../hooks/auth";

const drawerWidth = 270;

const useStyles = makeStyles(theme => ({
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
}));

const Sidebar = props => {
  const classes = useStyles();
  let history = useHistory();
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

  /**
   * Utility function used to determine if a menu link is active
   * @param {*} item
   */
  const setActive = item => {
    if (item.exact) {
      return history.location.pathname === `/${item.activePath}`;
    } else {
      return history.location.pathname.includes(item.activePath);
    }
  };

  // Configure sidebar menu items
  const MenuItems = [
    {
      link: "",
      title: "Home",
      activePath: "",
      exact: true,
      icon: HomeIcon,
      loginRequired: false,
    },
    {
      link: "admin/data/structures",
      title: "Data Management",
      activePath: "admin/data",
      icon: DashboardIcon,
      loginRequired: true,
      rolesRequired: ["LRE Admin"],
    },
    {
      link: "docs/overview",
      title: "Docs",
      activePath: "docs",
      icon: DocsIcon,
      loginRequired: true,
      rolesRequired: ["LRE Admin"],
    },
    {
      link: "all-things-viewer",
      title: "All Things Viewer",
      activePath: "all-things-viewer",
      exact: true,
      icon: EcoIcon,
      loginRequired: true,
      rolesRequired: ["LRE Admin", "CCWCD Admin"],
    },
    {
      link: "reports",
      title: "Reports",
      activePath: "reports",
      icon: ReportsIcon,
      loginRequired: true,
      rolesRequired: ["LRE Admin", "CCWCD Admin"],
    },
    {
      link: "auth0-sync",
      title: "User Management",
      activePath: "auth0-sync",
      icon: AccountIcon,
      loginRequired: true,
      rolesRequired: ["LRE Admin", "CCWCD Admin"],
    },
  ];

  const returnMenuItem = (item, isAuthenticated, user) => {
    const li = (
      <ListItem
        button
        onClick={() => goTo(item.link)}
        selected={setActive(item)}
        key={item.title}
      >
        <ListItemIcon className={classes.navIcon}>
          <item.icon />
        </ListItemIcon>
        <ListItemText className={classes.navText} primary={item.title} />
      </ListItem>
    );

    if (item.loginRequired && item.rolesRequired && user) {
      let roleSwitch = false;
      const roles = [...item.rolesRequired];
      roles.forEach(role => {
        if (user["https://ccwcd2.org/roles"].includes(role)) {
          roleSwitch = true;
        }
      });
      if (isAuthenticated && roleSwitch) {
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
            variant="temporary"
            anchor="left"
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

export default Sidebar;
