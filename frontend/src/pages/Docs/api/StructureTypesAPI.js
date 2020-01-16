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

const StructureTypesAPI = ({ classes, history}) => {

  const ListAllStructureTypesCode = `
    fetch('api/structure-types')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const ListAllStructureTypesResponse = `[
      {
        "structure_type_ndx": 1,
        "structure_type_name":"Production Well",
        "notes": "example note,
      },
      {
        "structure_type_ndx": 2,
        "structure_type_name":"Ditch/Canal",
        "notes": "example note,
      },
  ]`;

  const RetrieveStructureTypeCode = `
    fetch('api/structure-types/1')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const RetrieveStructureTypeResponse = `{
    "structure_type_ndx": 1,
    "structure_type_name":"Production Well",
    "notes": "example note,
  }`;

  const CreateStructureTypeCode = `
    // Data for new structure type
    const structureTypesData = {
      structure_type_name: 'Example Structure Type',
      ui: true,
      notes: 'Example note.',
    }

    // create new structure type
    axios.post('/api/structure-types', structureTypesData);
  `;

  const DeleteStructureTypesCode = `
    const DeletedStructureTypes =  [
      {
        "structure_type_ndx": 1,
        "structure_type_name":"Production Well",
        "notes": "example note,
        "delete_flag": true,
      },
    ]

    axios.delete('api/structure-types/delete', { data: DeletedStructureTypes });
  `;

  return (
    <div className={classes.root}>
      <DocsSidebar history={history} />
      <div className={classes.content}>
        <Typography variant="h3" color="secondary">Structure Types</Typography>
        <Typography variant="h6" className={classes.subtitle}>The Structures Types portion of the API is used to read and write data associated with structure types.</Typography>
        <Divider className={classes.divider} />

        {/* List All Structure Types */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="List All Structure Types"
              verb="GET"
              url="/api/structure-types"
              description="Returns a list of all structure types." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={ListAllStructureTypesCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={ListAllStructureTypesResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Retrieve a structure type */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Retrieve a Structure Types"
              verb="GET"
              url="/api/structure-types/:id"
              resourceArguments={[{
                name: "id",
                required: true,
                description: "The structure_type_ndx for the structure type that should be returned."
              }]}
              description="Returns details for an existing structure type. Supply the unique structure_type_ndx for a structure type, and the API will return the corresponding structure type object." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={RetrieveStructureTypeCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={RetrieveStructureTypeResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Create New Structure Type */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Create a Structure Type"
              verb="POST"
              url="/api/structure-types"
              description="This resource creates a new structure type. If the request is successful, a status code of 200 is returned" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={CreateStructureTypeCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Delete Structure types */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Delete Structure Types"
              verb="DELETE"
              url="/api/structures-types/delete"
              description="Deletes the specified structure types from the database. Marks the delete_flag field as true versus actually deleting the record. Responds with an HTTP status code of 200 if successful." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={DeleteStructureTypesCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

      </div>
    </div>
  )
}

export default withStyles(styles, { withTheme: true })(StructureTypesAPI);