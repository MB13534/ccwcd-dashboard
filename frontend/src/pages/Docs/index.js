import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import DocsSidebar from '../../components/DocsSidebar';
import Codeblock from '../../components/CodeBlock';
import { Button } from '@material-ui/core';

// create page styles
const styles = theme => ({
  root: {
    display: 'flex',
  },  
  content: {
    flexGrow: 1,
    padding: `15px 75px 75px 75px`,
    backgroundColor: `#ffffff`,
    minHeight: `100vh`,
  },
  btn: {
    marginRight: 5,
    marginTop: 15,
  },
  markdown: {
    '& h1': {
      fontSize: 45,
      color: theme.palette.secondary.main
    },
    '& h2': {
      fontSize: 35,
      lineHeight: 1.2,
    },
    '& h3': {
      fontSize: 25,
      lineHeight: 1.3,
    },
    '& a': {
      backgroundColor: `rgba(187,239,253,0.3)`,
      borderBottom: `1px solid rgba(0,0,0,0.2)`,
      color: `#1a1a1a`,
    },
    '& p': {
      fontSize: 17,
      lineHeight: 1.7,
    },
    '& ul': {
      fontSize: 17,
      lineHeight: 1.7,
    },
    '& code': {
      backgroundColor: `#f1f1f1`,
      color: `#d14997`,
      padding: 2,
      margin: 2,
    }
  }
});

const Doc = ({ classes, history, path, previousLink, nextLink }) => {
  const [markdown, setMarkdown] = useState(null);

  const goTo = (route) => {
    history.push(`/${route}`);
    localStorage.setItem('last_url', history.location.pathname);
  }

  useEffect(() => {
    async function getContent() {
      try {
        const content = await import(`./${path}.md`);
        const response = await axios.get(content.default);
        setMarkdown(response.data);
      } catch(err) {
        console.error(err);
      }
    }
    getContent();
  }, [path]);

  return (
    <div className={classes.root}>
      <DocsSidebar history={history} />
      <div className={classes.content}>   
        <ReactMarkdown source={markdown} className={classes.markdown} renderers={{ code: Codeblock }} />
        { previousLink &&
          <Button 
            className={classes.btn}
            variant="contained" 
            color="secondary" 
            onClick={() => goTo(previousLink)}
          >
            Previous
          </Button>
        }
        { nextLink && 
          <Button 
            className={classes.btn}
            variant="contained" 
            color="secondary" 
            onClick={() => goTo(nextLink)}
          >
            Next
          </Button>
        }
      </div>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(Doc);