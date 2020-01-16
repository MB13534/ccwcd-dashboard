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

const StructuresAPI = ({ classes, history}) => {

  const ListAllStructuresCode = `
    fetch('api/structures')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const ListAllStructuresResponse = `[
      {
        "structure_ndx":3,
        "structure_name":"Test Structure",
        "lon_dd":-108.013029241772,
        "lat_dd":37.4214671888491,
        "structure_type_ndx":2,
        "structure_type_name":"Booster Pump",
        "group_ndx":1,
        "group_name":"La Platas",
        "status_ndx":1,
        "status_descrip":"Active",
        "notes":""
      }
  ]`;

  const RetrieveStructureCode = `
    fetch('api/structures/3')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const RetrieveStructureResponse = `{
        "structure_ndx":3,
        "structure_name":"Test Structure",
        "lon_dd":-108.013029241772,
        "lat_dd":37.4214671888491,
        "structure_type_ndx":2,
        "structure_type_name":"Booster Pump",
        "group_ndx":1,
        "group_name":"La Platas",
        "status_ndx":1,
        "status_descrip":"Active",
        "notes":""
  }`;

  const CreateStructureCode = `
    // Data for new structure
    const structuresData = {
      structure_name: 'Test Structure',
      structure_type_ndx: '2',
      group_ndx: '1',
      status_ndx: '1',
      lon_dd: -108.013029241772,
      lat_dd: 37.4214671888491,
      notes: 'Example notes.',
    }

    // create new structure
    axios.post('/api/structures', structuresData);
  `;

  const StructureToMeasurementTypesCode = `
    // Data for structure to measurement types associations
    const structuresToMeasurementTypesData = {
        Flow: {
          structure_name: 'Test Structure',
          measure_type_ndx: 2,
          selected: true,
          unit_ndx: 4,
        }
      },
    }

    // create new structure
    axios.post('/api/structures/assoc/measure-types', structuresToMeasurementTypesData);
  `;

  const StructuresToContactsCode = `
    // Data for structure to contacts associations
    const structuresToContactsData: [
      {
        structure_name: 'Test Structure',
        contact_ndx: '3',
      }
    ],

    // create new structure
    axios.post('/api/structures/assoc/contacts', structuresToContactsData);
  `;

  const GetMeasurementsCode = `
    fetch('api/structures/3/measurements')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const GetMeasurementsResponse = `[
    {
      "measure_ndx":3,
      "measure_name":"Test Location Well Pump",
      "structure_ndx":3,
      "measure_type_ndx":2,
      "measure_type_name":"Well Pump",
      "unit_ndx":4,
      "notes":null
    }
  ]`;

  const GetContactsCode = `
    fetch('api/structures/3/contacts')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const GetContactsResponse = `[
    {
      "structure_ndx": 3,
      "contact_ndx": 4,
    }
  ]`;

  const DeleteStructureCode = `
    const DeletedStructures =  [
      {
        structure_name: 'Test Structure',
        structure_type_ndx: '2',
        group_ndx: '1',
        status_ndx: '1',
        lon_dd: -108.013029241772,
        lat_dd: 37.4214671888491,
        notes: 'Example notes.',
        delete_flag: true,
      },
    ]

    axios.delete('api/structures/delete', { data: DeletedStructures });
  `;

  return (
    <div className={classes.root}>
      <DocsSidebar history={history} />
      <div className={classes.content}>
        <Typography variant="h3" color="secondary">Structures</Typography>
        <Typography variant="h6" className={classes.subtitle}>The Structures portion of the API is used to read and write data associated with structures.</Typography>
        <Divider className={classes.divider} />

        {/* List All Structures */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="List All Structures"
              verb="GET"
              url="/api/structures"
              description="Returns a list of all structures and various associated data such as structure types and groups." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={ListAllStructuresCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={ListAllStructuresResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Retrieve a structure */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Retrieve a Structure"
              verb="GET"
              url="/api/structures/:id"
              resourceArguments={[{
                name: "id",
                required: true,
                description: "The structure_ndx for the structure that should be returned."
              }]}
              description="Returns details for an existing structure. Supply the unique structure_ndx for a structure, and the API will return the corresponding structure object." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={RetrieveStructureCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={RetrieveStructureResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Create New Structure */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Create a Structure"
              verb="POST"
              url="/api/structures"
              description="This resource creates a new structure. If the request is successful, a status code of 200 is returned" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={CreateStructureCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Create Structures to Measurement Types Associations */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Create Structure to Measurement Types Associations"
              verb="POST"
              url="/api/structures/assoc/measure-types"
              description="This resource creates associations between a structure and measurement types. The process of creating an association between a structure, measurement types, and a unit creates a new measurement. If the request is successful, a status code of 200 is returned" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={StructureToMeasurementTypesCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Create Structures to Contacts Associations */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Create Structure to Contacts Associations"
              verb="POST"
              url="/api/structures/assoc/contacts"
              description="This resource creates associations between a structure and contacts. If the request is successful, a status code of 200 is returned" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={StructuresToContactsCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Retrieve Associated Measurements */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Retrieve Associated Measurements"
              verb="GET"
              url="/api/structures/:id/measurements"
              resourceArguments={[{
                name: "id",
                required: true,
                description: "The structure_ndx that measurements should be returned for."
              }]}
              description="Returns a list of measurements that are associated with the requested structure" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={GetMeasurementsCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={GetMeasurementsResponse} theme="light"/>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Retrieve Associated Contacts */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Retrieve Associated Contacts"
              verb="GET"
              url="/api/structures/:id/contacts"
              resourceArguments={[{
                name: "id",
                required: true,
                description: "The structure_ndx that contacts should be returned for."
              }]}
              description="Returns a list of contacts that are associated with the requested structure" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={GetContactsCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={GetContactsResponse} theme="light"/>
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Delete Structures */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Delete Structures"
              verb="DELETE"
              url="/api/structures/delete"
              description="Deletes the specified structures from the database. Marks the delete_flag field as true versus actually deleting the record. Responds with an HTTP status code of 200 if successful." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={DeleteStructureCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

      </div>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(StructuresAPI);