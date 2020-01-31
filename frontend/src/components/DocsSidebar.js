import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import IconButton from '@material-ui/core/IconButton';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

import { useAuth0 } from '../hooks/auth';

const drawerWidth = 300;

const styles = theme => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  toolbar: {
    // backgroundColor: theme.palette.primary.main,
    padding: `10px 10px`,
    // ...theme.mixins.toolbar,
  },
  drawerPaper: {
    width: drawerWidth,
    overflow: `auto!important`,
    // background: `#f7f7f7`,
    // borderRight: `1px solid #ececec`
    backgroundColor: theme.palette.primary.main,
  },
  sidebarTitle: {
    color: `#ffffff`,
    marginTop: 20,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  logo: {
    maxHeight: 80,
  },
  nav: {
    color: `#ffffff`,
    marginTop: 10,
  },
  navIcon: {
    color: `#ffffff`,
  },
  navText: {
    '& span' : {
      fontSize: `18px!important`
    }
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
});


const DocsSidebar = (props) => {
  const { history, classes, theme, container } = props;
  const [installationExpanded, setInstallationExpanded] = useState(false);
  const [apiExpanded, setApiExpanded] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated } = useAuth0();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // function for naviating to a specific page in the app
  const goTo = (route) => {
    history.push(`/${route}`);
    localStorage.setItem('last_url', history.location.pathname);
  }

  const setActive = (route) => {
    if (history.location.pathname.includes(route) && route !== '/') {
      return true;
    } else if (route === '/' && history.location.pathname === '/') {
      return true;
    }
    return false;
  }

  useEffect(() => {
    const installationPaths = ['/docs/getting-started', '/docs/authentication', '/docs/environment-variables', '/docs/database-setup', '/docs/application-startup']
    if (installationPaths.includes(history.location.pathname)) {
      setInstallationExpanded(true);
    } else {
      setInstallationExpanded(false);
    }
  }, [history]);

  useEffect(() => {
    if (history.location.pathname.includes('/docs/api')) {
      setApiExpanded(true);
    } else {
      setApiExpanded(false);
    }
  }, [history]);

  const APIMenuItems = [
    { link: 'docs/api/overview', title: 'Introduction' },
    { link: 'docs/api/structures', title: 'Structures' },
    { link: 'docs/api/structure-types', title: 'Structure Types' },
    { link: 'docs/api/structure-groups', title: 'Structure Groups' },
    { link: 'docs/api/units', title: 'Units' },
    { link: 'docs/api/measurement-types', title: 'Measurement Types' },
    { link: 'docs/api/contacts', title: 'Contacts' },
    { link: 'docs/api/contact-groups', title: 'Contact Groups' },
  ]

  const drawer = (
    <div id="sidebar">
      <List className={classes.nav}>
        { isAuthenticated &&
          <React.Fragment>
            <ListItem button onClick={() => goTo('docs/overview')} selected={setActive('/docs/overview')}>
              <ListItemText className={classes.navText} primary="Overview" />
            </ListItem>
            <ListItem button onClick={() => goTo('docs/main-concepts')} selected={setActive('/docs/main-concepts')}>
              <ListItemText className={classes.navText} primary="Main Concepts" />
            </ListItem>
            <ListItem button onClick={() => setInstallationExpanded(state => !state)} selected={setActive('/docs/installation')}>
              <ListItemText className={classes.navText} primary="Installation" />
              {installationExpanded ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={installationExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItem button className={classes.nested} onClick={() => goTo('docs/getting-started')} selected={setActive('/docs/getting-started')}>
                  <ListItemText primary="Getting Started" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={() => goTo('docs/authentication')} selected={setActive('/docs/authentication')}>
                  <ListItemText primary="Authentication Setup" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={() => goTo('docs/environment-variables')} selected={setActive('/docs/environment-variables')}>
                  <ListItemText primary="Config Environment Variables" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={() => goTo('docs/database-setup')} selected={setActive('/docs/database-setup')}>
                  <ListItemText primary="Database Setup" />
                </ListItem>
                <ListItem button className={classes.nested} onClick={() => goTo('docs/application-startup')} selected={setActive('/docs/application-startup')}>
                  <ListItemText primary="Starting the Application" />
                </ListItem>
              </List>
            </Collapse>
            <ListItem button onClick={() => goTo('docs/deploying')} selected={setActive('/docs/deploying')}>
              <ListItemText className={classes.navText} primary="Deploying" />
            </ListItem>
            <ListItem button onClick={() => setApiExpanded(state => !state)} selected={setActive('/docs/installation')}>
              <ListItemText className={classes.navText} primary="API Documentation" />
              {apiExpanded ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={apiExpanded} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {APIMenuItems.map((item) => (
                  <ListItem
                    key={item.link}
                    button
                    className={classes.nested}
                    onClick={() => goTo(item.link)}
                    selected={setActive(`/${item.link}`)}
                  >
                    <ListItemText primary={item.title} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
            <ListItem button onClick={() => goTo('docs/main-concepts')} selected={setActive('/docs/main-concepts')}>
              <ListItemText className={classes.navText} primary="Helpful Resources" />
            </ListItem>
            <ListItem button onClick={() => goTo('')} selected={false}>
              <ListItemText className={classes.navText} primary="Return to App" />
            </ListItem>
          </React.Fragment>
        }
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
        >
        </IconButton>
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
            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
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
}

DocsSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  // Injected by the documentation to work in an iframe.
  // You won't need it on your project.
  container: PropTypes.object,
  theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(DocsSidebar);