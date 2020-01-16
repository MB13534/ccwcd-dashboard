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
    fetch('api/contacts')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const ListAllResponse = `[
    {
      "contact_ndx":4,
      "contact_address":"ben.tyler@lrewater.com",
      "contact_name":"Ben Tyler",
      "contact_org":"LRE",
      "contact_group_name":["LRE WITS"],
      "notes":"example note",
    },
    {
      "contact_ndx":5,
      "contact_address":"bodie@gmail.com",
      "contact_name":"Bodie",
      "contact_org":"Durango Dogs",
      "contact_group_name":["The Dogs"],
      "notes":"example note",
    }
  ]`;

  const RetrieveOneCode = `
    fetch('api/contacts/5')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const RetrieveOneResponse = `{
    "contact_ndx":5,
    "contact_address":"bodie@gmail.com",
    "contact_name":"Bodie",
    "contact_org":"Durango Dogs",
    "contact_group_name":["The Dogs"],
    "notes":"example note",
  }`;

const CreateOneCode = `
    // Data for new contact
    const newData = {
      "contact_address":"bodie@gmail.com",
      "contact_name":"Bodie",
      "contact_org":"Durango Dogs",
      "contact_group_name":["The Dogs"],
      "notes":"example note",
    }

    // create new contact
    axios.post('/api/contacts', newData);
  `;

  const DeleteCode = `
    const DeleteData =  [
      {
        "contact_ndx":5,
        "contact_address":"bodie@gmail.com",
        "contact_name":"Bodie",
        "contact_org":"Durango Dogs",
        "contact_group_name":["The Dogs"],
        "notes":"example note",
        "delete_flag: true,
      },
    ]

    axios.delete('api/contacts/delete', { data: DeleteData });
  `;

  const getAllAssocCode = `
    fetch('api/contact/assoc/contact-groups')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const getAllAssocResponse = `[
    {
      "contact_ndx": 8,
      "contact_group_ndx": 7,
      "contact_group_name": "LRE Groundwater"
    },
    {
      "contact_ndx": 5,
      "contact_group_ndx": 7,
      "contact_group_name": "LRE Groundwater"
    },
  ]`;

  const getOneAssocCode = `
    fetch('api/contacts/8/assoc/contact-groups')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const getOneAssocResponse = `{
    "contact_ndx": 8,
    "contact_group_ndx": 7,
    "contact_group_name": "LRE Groundwater"
  }`;

  const postAssocCode = `
    const AssocData = [
      {
        "contact_ndx": 5,
        "contact_address": "bodie@gmail.com",
        "contact_group_name": "LRE Groundwater"
      },
      {
        "contact_ndx": 5,
        "contact_address": "bodie@gmail.com",
        "contact_group_name": "LRE WITS"
      },
    ]

    // create new contact to contact group associations
    axios.post('/api/contacts/assoc/contact-groups', AssocData);
  `;

  return (
    <div className={classes.root}>
      <DocsSidebar history={history} />
      <div className={classes.content}>
        <Typography variant="h3" color="secondary">Contacts</Typography>
        <Typography variant="h6" className={classes.subtitle}>The Contacts portion of the API is used to read and write data associated with contacts.</Typography>
        <Divider className={classes.divider} />

        {/* List All contacts */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="List All Contacts"
              verb="GET"
              url="/api/contacts"
              description="Returns a list of all contacts." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={ListAllCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={ListAllResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Retrieve a contact */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Retrieve a Contact"
              verb="GET"
              url="/api/contacts/:id"
              resourceArguments={[{
                name: "id",
                required: true,
                description: "The contact_ndx for the contact that should be returned."
              }]}
              description="Returns details for an existing contact. Supply the unique contact_ndx for a contact, and the API will return the corresponding contact object." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={RetrieveOneCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={RetrieveOneResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Create New Contact */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Create a Contact"
              verb="POST"
              url="/api/contacts"
              description="This resource creates a contact. If the request is successful, a status code of 200 is returned" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={CreateOneCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Delete Contacts */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Delete Contacts"
              verb="DELETE"
              url="/api/contacts/delete"
              description="Deletes the specified contacts from the database. Marks the delete_flag field as true versus actually deleting the record. Responds with an HTTP status code of 200 if successful." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={DeleteCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Get all contacts to contact groups associations */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Retrieve All Contact to Contact Groups Associations"
              verb="GET"
              url="/api/contacts/assoc/contact-groups"
              description="Retrieves all contact to contact groups" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={getAllAssocCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={getAllAssocResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Get all contact groups associations for a single contact */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Retrieve All Contact Group Associations for a Single Contact"
              verb="GET"
              url="/api/contact/:id/assoc/contact-groups"
              description="Retrieves all contact group associations for a contact" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={getOneAssocCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={getOneAssocResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Create contacts to contact groups associations */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Create Contacts to Contact Groups Asssociations"
              verb="POST"
              url="/api/contacts/assoc/contact-groups"
              description="Create contacts to contact groups associations. Responds with an HTTP status code of 200 if successful." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={postAssocCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

      </div>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(UnitsAPI);