import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Codeblock from '../../../components/CodeBlock';
import Grid from '@material-ui/core/Grid';
import DocsSidebar from '../../../components/DocsSidebar';
import { Typography, Divider } from '@material-ui/core';
import ResourceDescription from '../../../components/api/ResourceDescription';

// create page styles
const styles = theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: `30px 75px 75px 75px`,
    backgroundColor: `#ffffff`,
    minHeight: `100vh`,
  },
  marginTop: {
    marginTop: 15,
  },
  subtitle: {
    marginTop: 25,
    fontWeight: 300,
  },
  divider: {
    marginTop: 25,
    marginBottom: 25,
  },
  description: {
    fontSize: 17,
    lineHeight: 1.7,
  },
});

const UnitsAPI = ({ classes, history}) => {

  const ListAllCode = `
    fetch('api/contact-groups')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const ListAllResponse = `[
    {
      "contact_group_ndx":6,
      "contact_group_name":"LRE Surface Water",
      "notes":""
    },
    {
      "contact_group_ndx":5,
      "contact_group_name":"LRE WITS",
      "notes":"example note"
    }
  ]`;

  const RetrieveOneCode = `
    fetch('api/contact-groups/5')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const RetrieveOneResponse = `{
    "contact_group_ndx":5,
    "contact_group_name":"LRE WITS",
    "notes":"example note"
  }`;

  const CreateOneCode = `
    // Data for new contact group
    const newData = {
      "contact_group_name":"LRE Groundwater",
      "notes":"example note"
    }

    // create new contact group
    axios.post('/api/contact-groups', newData);
  `;

  const DeleteCode = `
    const DeleteData =  [
      {
        "contact_group_ndx":5,
        "contact_group_name":"LRE WITS",
        "notes":"example note",
        "delete_flag": true,
      },
    ]

    axios.delete('api/contact-groups/delete', { data: DeleteData });
  `;

  return (
    <div className={classes.root}>
      <DocsSidebar history={history} />
      <div className={classes.content}>
        <Typography variant="h3" color="secondary">Contact Groups</Typography>
        <Typography variant="h6" className={classes.subtitle}>The Contact Groups portion of the API is used to read and write data associated with contact groups.</Typography>
        <Divider className={classes.divider} />

        {/* List All Contact Groups */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="List All Contact Groups"
              verb="GET"
              url="/api/contact-groups"
              description="Returns a list of all contact groups." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={ListAllCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={ListAllResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Retrieve a contact group */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Retrieve a Contact Group"
              verb="GET"
              url="/api/contact-groups/:id"
              resourceArguments={[{
                name: "id",
                required: true,
                description: "The contact_group_ndx for the unit that should be returned."
              }]}
              description="Returns details for an existing contact group. Supply the unique contact_group_ndx for a contact group, and the API will return the corresponding contact group object." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={RetrieveOneCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={RetrieveOneResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Create New Contact Group */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Create a Contact Group"
              verb="POST"
              url="/api/contact-groups"
              description="This resource creates a new contact group. If the request is successful, a status code of 200 is returned" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={CreateOneCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Delete Contact Groups */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Delete Contact Groups"
              verb="DELETE"
              url="/api/contact-groups/delete"
              description="Deletes the specified contact groups from the database. Marks the delete_flag field as true versus actually deleting the record. Responds with an HTTP status code of 200 if successful." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={DeleteCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

      </div>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(UnitsAPI);