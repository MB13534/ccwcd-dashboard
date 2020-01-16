import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, List, ListItem, ListItemText } from '@material-ui/core';

// create page styles
const styles = theme => ({
  description: {
    fontSize: 17,
    lineHeight: 1.7,
  },
  resourceLink: {
    backgroundColor: `#F1F1F1`,
    borderRadius: 4,
    display: `inline-block`,
    padding: `5px 10px`,
  },
  httpVerb: {
    color: `#1f8d53`,
    marginRight: 5,
  },
  url: {
    color: `#d14997`,
  },
  argumentsTitle: {
    marginTop: theme.spacing(3),
  },
  argumentTitle: {
    display: `flex`,
    marginBottom: theme.spacing(1)
  },
  required: {
    color: `#d14997`,
    marginLeft: 10,
  }
});

const ResourceDescription = ({ classes, title, verb, url, description, resourceArguments = []}) => {
  const setVerbColor = (verb) => {
    const verbFormatted = verb.toLowerCase();
    if (verbFormatted === 'get') {
      return '#1f8d53';
    } else if (verbFormatted === 'post') {
      return'#2526c4';
    } else if (verbFormatted === 'delete') {
      return '#d37711';
    }
  }

  return (
    <div className={classes.root}>
      <div className={classes.resourceTitle}>
        <Typography variant="h5" gutterBottom>{title}</Typography>
        <Typography variant="body1" className={classes.resourceLink} gutterBottom>
          <span className={classes.httpVerb} style={{color: setVerbColor(verb)}}>{verb}</span>
          <span className={classes.url}>{url}</span>
        </Typography>
      </div>
      <Typography variant="body1" className={classes.description}>{description}</Typography>
      { resourceArguments.length > 0 &&
        <Typography variant="h6" className={classes.argumentsTitle}>Arguments</Typography>
      }
      { resourceArguments.map((arg) => (
        <List key={arg.name}>
          <ListItem>
            <ListItemText>
              <div className={classes.argumentTitle}>
                <Typography variant="body1">{arg.name}</Typography>
                { arg.required &&
                  <Typography variant="body1" className={classes.required}>Required</Typography>
                }
              </div>
              <Typography variant="body2">{arg.description}</Typography>
            </ListItemText>
          </ListItem>
        </List>

      ))}
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(ResourceDescription);