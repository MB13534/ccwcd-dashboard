import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';

// Create the adapter link that makes linking/routing between pages possible
const AdapterLink = React.forwardRef((props, ref) => <Link innerRef={ref} {...props} />);

// create page styles
const styles = theme => ({
  nav: {
    marginTop: 20,
    padding: 15,
  },
  chip: {
    marginRight: 5,
    cursor: `pointer`,
    '&:hover': {
      backgroundColor: theme.palette.secondary.main,
      color: `#ffffff`
    }
  },
});

const ChipMenu = (props) => {
  const { classes, items, activePage } = props;

  return (    
    <Paper className={classes.nav}>
      {items.map((item) => (
        <Chip
          key={item.name}
          className={classes.chip}
          label={item.name}
          color={activePage === item.href ? 'secondary' : 'default'} 
          component={AdapterLink} to={item.href} />
      ))}
    </Paper>
  )
}

ChipMenu.propTypes = {
  items: PropTypes.array.isRequired,
  activePage: PropTypes.string,
};

export default withStyles(styles, { withTheme: true })(ChipMenu);
