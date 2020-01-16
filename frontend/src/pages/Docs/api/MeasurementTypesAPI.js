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
    fetch('api/measurement-types')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const ListAllResponse = `[
    {
      "measure_type_ndx":10,
      "measure_type_name":"Actuator Setting",
      "unit_abbrev":["CFS","Ft","GPM","in","MGD"],
      "ui":false,
      "notes":null,
    },
    {
      "measure_type_ndx":5,
      "measure_type_name":"Battery",
      "unit_abbrev":["mV"],
      "ui":true,
      "notes":null,
    }
  ]`;

  const RetrieveOneCode = `
    fetch('api/measurement-types/9')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const RetrieveOneResponse = `{
    "measure_type_ndx":10,
    "measure_type_name":"Actuator Setting",
    "unit_abbrev":["CFS","Ft","GPM","in","MGD"],
    "ui":false,
    "notes":null,
  }`;

const CreateOneCode = `
    // Data for new measurement type
    const newData = {=
      "measure_type_name":"Flow",
      "unit_abbrev":["CFS","GPM","MGD"],
      "ui":true,
      "notes":null,
    }

    // create new unit
    axios.post('/api/measurement-types', newData);
  `;

  const DeleteCode = `
    const DeleteData =  [
      {
        "measure_type_ndx": 17,
        "measure_type_name":"Flow",
        "unit_abbrev":["CFS","GPM","MGD"],
        "ui":true,
        "notes":null,
        "delete_flag": true,
      },
    ]

    axios.delete('api/measurement-types/delete', { data: DeleteData });
  `;

  const getAllAssocCode = `
    fetch('api/measurement-types/assoc/units')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const getAllAssocResponse = `[
    {
      "measure_type_ndx": 15,
      "unit_ndx": 5,
      "unit_name": "Acre-feet"
    },
    {
      "measure_type_ndx": 14,
      "unit_ndx": 1,
      "unit_name": "Barrels"
    }
  ]`;

  const getOneAssocCode = `
    fetch('api/measurement-types/15/assoc/units')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const getOneAssocResponse = `{
      "measure_type_ndx": 15,
      "unit_ndx": 5,
      "unit_name": "Acre-feet"
  }`;

  const postAssocCode = `
    const AssocData = [
      {
        "measure_type_ndx": 10,
        "measure_type_name": "Actuator Setting",
        "unit_ndx": 7,
      }
      {
        "measure_type_ndx": 10,
        "measure_type_name": "Actuator Setting",
        "unit_ndx": 4,
      }
    ]

    // create new measurement types to unit associations
    axios.post('/api/measurement-types/assoc/units', AssocData);
  `;

  return (
    <div className={classes.root}>
      <DocsSidebar history={history} />
      <div className={classes.content}>
        <Typography variant="h3" color="secondary">Measurement Types</Typography>
        <Typography variant="h6" className={classes.subtitle}>The Measurement Types portion of the API is used to read and write data associated with measurement types.</Typography>
        <Divider className={classes.divider} />

        {/* List All measurement types */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="List All Measurement Types"
              verb="GET"
              url="/api/measurement-types"
              description="Returns a list of all measurement types." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={ListAllCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={ListAllResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Retrieve a measurement type */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Retrieve a Measurement Type"
              verb="GET"
              url="/api/measurement-types/:id"
              resourceArguments={[{
                name: "id",
                required: true,
                description: "The index for the unit that should be returned."
              }]}
              description="Returns details for an existing measurement type. Supply the unique measure_type_ndx for a measurement type, and the API will return the corresponding measurement type object." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={RetrieveOneCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={RetrieveOneResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Create New Measurement Type */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Create a Measurement Type"
              verb="POST"
              url="/api/measurement-types"
              description="This resource creates a new measurement type. If the request is successful, a status code of 200 is returned" />
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
              title="Delete Measurement Type"
              verb="DELETE"
              url="/api/measurement-types/delete"
              description="Deletes the specified measurement types from the database. Marks the delete_flag field as true versus actually deleting the record. Responds with an HTTP status code of 200 if successful." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={DeleteCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Get all measurement types to units associations */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Retrieve All Measurement Types to Units Associations"
              verb="GET"
              url="/api/measurement-types/assoc/units"
              description="Retrieves all measurement types to unit associations" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={getAllAssocCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={getAllAssocResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Get all units associations for a single measurement types */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Retrieve All Unit Associations for a Single Measurement Type"
              verb="GET"
              url="/api/measurement-types/:id/assoc/units"
              description="Retrieves all unit associations for a single measurement type" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={getOneAssocCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={getOneAssocResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Create measurement types to unit associations */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Create Measurement Types to Units Asssociations"
              verb="POST"
              url="/api/measurement-types/assoc/units"
              description="Create measurement types to units associations. Responds with an HTTP status code of 200 if successful." />
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