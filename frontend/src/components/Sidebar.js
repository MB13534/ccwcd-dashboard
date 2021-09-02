import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DnsIcon from '@material-ui/icons/Dns';
import FileIcon from '@material-ui/icons/AttachFile';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import PhoneIcon from '@material-ui/icons/Phone';
import DashboardIcon from '@material-ui/icons/Dashboard';
import RechargeIcon from '@material-ui/icons/Opacity';
import DepletionsIcon from '@material-ui/icons/TrackChanges';
import AccountIcon from '@material-ui/icons/AccountCircle';
import EcoIcon from '@material-ui/icons/Eco';
import GuideIcon from '@material-ui/icons/MenuBook';
import ReportsIcon from '@material-ui/icons/Assignment';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import logo from '../images/ccwcd_logo.png';
import { useAuth0 } from '../hooks/auth';
import useVisibility from '../hooks/useVisibility';

const drawerWidth = 270;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('md')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  mobileToolbar: {
    backgroundColor: theme.palette.primary.main,
    color: `#ffffff`,
  },
  toolbar: {
    textAlign: 'center',
    padding: theme.spacing(4, 0),
    backgroundColor: '#ffffff',
    ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    overflowY: `auto!important`,
    overflowX: 'hidden',
    backgroundColor: theme.palette.primary.main,
    borderRight: '1px solid #ddd',
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
    '& span': {
      fontSize: `18px!important`,
    },
  },
  nestedNavText: {
    '& span': {
      fontSize: `14px!important`,
    },
  },
  nested: {
    marginLeft: theme.spacing(6),
  },
}));

const Sidebar = props => {
  const classes = useStyles();
  let history = useHistory();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, user, loginWithRedirect, logout } = useAuth0();
  const [dataManagementVisibility, handleDataManagementVisibility] = useVisibility(false);
  let location = useLocation();

  useEffect(() => {
    if (location.pathname.includes('members-management')) {
      handleDataManagementVisibility(true);
    }
  }, [location]); //eslint-disable-line

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // function for naviating to a specific page in the app
  const goTo = route => {
    history.push(`/${route}`);
    localStorage.setItem('last_url', history.location.pathname);
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
      link: 'reports',
      title: 'Reports',
      activePath: 'reports',
      icon: ReportsIcon,
      loginRequired: true,
      rolesRequired: ['LRE Admin', 'CCWCD Admin', 'CCWCD Data Viewer', 'CCWCD Admin Demo'],
    },
    {
      link: 'all-things-viewer',
      title: 'All Things Viewer',
      activePath: 'all-things-viewer',
      exact: true,
      icon: EcoIcon,
      loginRequired: true,
      rolesRequired: ['LRE Admin', 'CCWCD Admin', 'CCWCD Data Viewer', 'CCWCD Admin Demo'],
    },
    {
      link: 'mobile-stations-report',
      title: 'Mobile Viewer',
      activePath: 'mobile-stations-report',
      exact: true,
      icon: PhoneIcon,
      loginRequired: true,
      mobileOnly: true,
      rolesRequired: ['LRE Admin', 'CCWCD Admin', 'Mobile Page Landing', 'Mobile Page Not-Landing'],
    },
    {
      link: 'user-management',
      title: 'User Management',
      activePath: 'user-management',
      icon: AccountIcon,
      loginRequired: true,
      rolesRequired: ['LRE Admin', 'CCWCD Admin', 'CCWCD Admin Demo'],
    },
    {
      link: 'members-management/contracts-wells-meters',
      title: 'Data Management',
      activePath: 'members-management',
      icon: DashboardIcon,
      loginRequired: true,
      rolesRequired: ['LRE Admin', 'CCWCD Admin', 'CCWCD Admin Demo'],
      visibilityVarName: 'dataManagementVisibility',
      children: [
        {
          link: 'members-management/contracts-wells-meters',
          title: 'Contract Associations',
          activePath: 'members-management/contracts-wells-meters',
          icon: ReportsIcon,
          loginRequired: true,
          rolesRequired: ['LRE Admin', 'CCWCD Admin', 'CCWCD Admin Demo'],
        },
        {
          link: 'members-management/meter-adjustments',
          title: 'Meter Adjustments',
          activePath: 'members-management/meter-adjustments',
          icon: ReportsIcon,
          loginRequired: true,
          rolesRequired: ['LRE Admin', 'CCWCD Admin', 'CCWCD Admin Demo'],
        },
        {
          link: 'members-management/meter-correction-factors',
          title: 'Meter Correction Factors',
          activePath: 'members-management/meter-correction-factors',
          icon: ReportsIcon,
          loginRequired: true,
          rolesRequired: ['LRE Admin', 'CCWCD Admin', 'CCWCD Admin Demo'],
        },
        {
          link: 'members-management/well-attributes',
          title: 'Well Attributes',
          activePath: 'members-management/well-attributes',
          icon: ReportsIcon,
          loginRequired: true,
          rolesRequired: ['LRE Admin', 'CCWCD Admin', 'CCWCD Admin Demo'],
        },
      ],
    },
    {
      link: 'recharge-accounting',
      title: 'Recharge Accounting',
      activePath: 'recharge-accounting',
      icon: RechargeIcon,
      loginRequired: true,
      rolesRequired: ['CCWCD Admin', 'LRE Admin', 'CCWCD Admin Demo'],
    },
    {
      link: 'depletions/new-data',
      title: 'Depletions Model',
      activePath: 'depletions',
      // exact: true,
      icon: DepletionsIcon,
      loginRequired: true,
      rolesRequired: ['CCWCD Admin', 'LRE Admin', 'CCWCD Admin Demo'],
    },
    {
      link: 'files/',
      title: 'File Sharing',
      activePath: 'files/',
      icon: FileIcon,
      loginRequired: false,
    },
    {
      link: 'database-management/structures',
      title: 'DB Lists Management',
      activePath: 'database-management',
      icon: DnsIcon,
      loginRequired: true,
      rolesRequired: ['LRE Admin', 'CCWCD Admin', 'CCWCD Admin Demo'],
    },
    {
      link: 'users-guide',
      title: "Users' Guide",
      activePath: 'users-guide',
      icon: GuideIcon,
      loginRequired: true,
      rolesRequired: ['LRE Admin', 'CCWCD Admin', 'CCWCD Admin Demo', 'CCWCD Data Viewer'],
    },
  ];

  const returnMenuItem = (item, isAuthenticated, user) => {
    const li = (
      <ListItem button selected={setActive(item)}>
        <ListItemIcon className={classes.navIcon} onClick={() => goTo(item.link)}>
          <item.icon />
        </ListItemIcon>
        <ListItemText className={classes.navText} primary={item.title} onClick={() => goTo(item.link)} />

        {item.visibilityVarName === 'dataManagementVisibility' &&
          (dataManagementVisibility ? (
            <ExpandLess onClick={handleDataManagementVisibility} />
          ) : (
            <ExpandMore onClick={handleDataManagementVisibility} />
          ))}
      </ListItem>
    );

    const NestedUl = () => {
      if (item.visibilityVarName === 'dataManagementVisibility' && item.children) {
        return (
          <Collapse in={dataManagementVisibility} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {item.children.map(child => (
                <ListItem
                  button
                  onClick={() => goTo(child.link)}
                  selected={setActive(child)}
                  key={Math.random() * 9999999}
                  className={classes.nested}
                >
                  <ListItemText className={classes.nestedNavText} primary={child.title} />
                </ListItem>
              ))}
            </List>
          </Collapse>
        );
      }
    };

    const list = (
      <React.Fragment key={Math.random() * 9999999}>
        {item.mobileOnly && <Hidden smUp>{li}</Hidden>}
        {!item.mobileOnly && <>{li}</>}
        {NestedUl()}
      </React.Fragment>
    );

    if (item.loginRequired && item.rolesRequired && user) {
      let roleSwitch = false;
      const roles = [...item.rolesRequired];
      roles.forEach(role => {
        if (user['https://ccwcd2.org/roles'].includes(role)) {
          roleSwitch = true;
        }
      });
      if (isAuthenticated && roleSwitch) {
        return list;
      }
    } else if (item.loginRequired) {
      if (isAuthenticated) {
        return list;
      }
    } else {
      return list;
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
            <ListItemText className={classes.navText} primary="Logout" onClick={() => logout()} />
          </ListItem>
        ) : (
          <ListItem button>
            <ListItemIcon className={classes.navIcon}>
              <AccountIcon />
            </ListItemIcon>
            <ListItemText className={classes.navText} primary="Login" onClick={() => loginWithRedirect()} />
          </ListItem>
        )}
      </List>
    </div>
  );

  return (
    <div>
      <Toolbar className={classes.mobileToolbar}>
        <IconButton
          color="inherit"
          aria-label="Open drawer"
          onClick={handleDrawerToggle}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" color="inherit" noWrap>
          CCWCD Dashboard
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
