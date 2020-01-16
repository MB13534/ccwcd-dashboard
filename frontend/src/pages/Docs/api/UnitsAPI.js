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
    fetch('api/units')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const ListAllResponse = `[
    {
      "unit_ndx":9,
      "unit_name":"Pounds per Square Inch",
      "unit_abbrev":"PSI",
      "notes":"Measure of Pressure",
    },
    {
      "unit_ndx":5,
      "unit_name":"Acre-feet",
      "unit_abbrev":"AF",
      "notes":"325852.723 Gallons = 1 AF",
    }
  ]`;

  const RetrieveOneCode = `
    fetch('api/units/9')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const RetrieveOneResponse = `{
    "unit_ndx":9,
    "unit_name":"Pounds per Square Inch",
    "unit_abbrev":"PSI",
    "notes":"Measure of Pressure",
  }`;

  const CreateOneCode = `
    // Data for new unit
    const newData = {
      "unit_name":"Cubic Feet Per Second",
      "unit_abbrev":"CFS",
      "notes":"CFS",
    }

    // create new unit
    axios.post('/api/units', newData);
  `;

  const DeleteCode = `
    const DeleteData =  [
      {
        "unit_ndx":9,
        "unit_name":"Pounds per Square Inch",
        "unit_abbrev":"PSI",
        "notes":"Measure of Pressure",
        "delete_flag": true,
      },
    ]

    axios.delete('api/units/delete', { data: DeleteData });
  `;

  return (
    <div className={classes.root}>
      <DocsSidebar history={history} />
      <div className={classes.content}>
        <Typography variant="h3" color="secondary">Units</Typography>
        <Typography variant="h6" className={classes.subtitle}>The Units portion of the API is used to read and write data associated with units.</Typography>
        <Divider className={classes.divider} />

        {/* List All Units */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="List All Units"
              verb="GET"
              url="/api/units"
              description="Returns a list of all units." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={ListAllCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={ListAllResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Retrieve a unit */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Retrieve a Unit"
              verb="GET"
              url="/api/units/:id"
              resourceArguments={[{
                name: "id",
                required: true,
                description: "The group_ndx for the unit that should be returned."
              }]}
              description="Returns details for an existing unit. Supply the unique group_ndx for a unit, and the API will return the corresponding unit object." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={RetrieveOneCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={RetrieveOneResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Create New unit */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Create a Unit"
              verb="POST"
              url="/api/units"
              description="This resource creates a new unit. If the request is successful, a status code of 200 is returned" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={CreateOneCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Delete Units */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Delete Units"
              verb="DELETE"
              url="/api/units/delete"
              description="Deletes the specified units from the database. Marks the delete_flag field as true versus actually deleting the record. Responds with an HTTP status code of 200 if successful." />
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