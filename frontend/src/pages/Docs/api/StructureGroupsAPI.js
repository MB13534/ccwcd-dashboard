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

  const ListAllCode = `
    fetch('api/structure-groups')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const ListAllResponse = `[
    {
      "group_ndx":1,
      "group_name":"La Platas",
      "centroid_lon_dd":-108.029521323777,
      "centroid_lat_dd":37.3870812231959,
      "extent_diameter_ft":null,
      "notes":"test",
      "ui":true,
    },
    {
      "group_ndx":2,
      "group_name":"Molas",
      "centroid_lon_dd":-107.699800743713,
      "centroid_lat_dd":37.7426027560534,
      "extent_diameter_ft":null,
      "notes":"test",
      "ui":true,
    }
  ]`;

  const RetrieveOneCode = `
    fetch('api/structure-types/1')
      .then(response => response.json())
      .then(json => console.log(json));
  `;

  const RetrieveOneResponse = `{
    "group_ndx":1,
    "group_name":"La Platas",
    "centroid_lon_dd":-108.029521323777,
    "centroid_lat_dd":37.3870812231959,
    "extent_diameter_ft":null,
    "notes":"test",
    "ui":true,
  }`;

  const CreateOneCode = `
    // Data for new structure group
    const newData = {
      "group_name":"San Juans",
      "centroid_lon_dd":-108.029521323777,
      "centroid_lat_dd":37.3870812231959,
      "extent_diameter_ft":null,
      "notes":"test",
      "ui":true,
    }

    // create new structure group
    axios.post('/api/structure-groups', newData);
  `;

  const DeleteCode = `
    const DeleteData =  [
      {
        "group_ndx":1,
        "group_name":"La Platas",
        "centroid_lon_dd":-108.029521323777,
        "centroid_lat_dd":37.3870812231959,
        "extent_diameter_ft":null,
        "notes":"test",
        "ui":true,
        "delete_flag": true,
      },
    ]

    axios.delete('api/structure-types/delete', { data: DeleteData });
  `;

  return (
    <div className={classes.root}>
      <DocsSidebar history={history} />
      <div className={classes.content}>
        <Typography variant="h3" color="secondary">Structure Groups</Typography>
        <Typography variant="h6" className={classes.subtitle}>The Structures Groups portion of the API is used to read and write data associated with structure groups.</Typography>
        <Divider className={classes.divider} />

        {/* List All Structure Groups */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="List All Structure Groups"
              verb="GET"
              url="/api/structure-groups"
              description="Returns a list of all structure groups." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={ListAllCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={ListAllResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Retrieve a structure group */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Retrieve a Structure Group"
              verb="GET"
              url="/api/structure-groups/:id"
              resourceArguments={[{
                name: "id",
                required: true,
                description: "The group_ndx for the structure group that should be returned."
              }]}
              description="Returns details for an existing structure group. Supply the unique group_ndx for a structure type, and the API will return the corresponding structure group object." />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={RetrieveOneCode} />
            <Typography variant="h6">Response</Typography>
            <Codeblock language="json" value={RetrieveOneResponse} theme="light" />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Create New Structure group */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Create a Structure Group"
              verb="POST"
              url="/api/structure-types"
              description="This resource creates a new structure type. If the request is successful, a status code of 200 is returned" />
          </Grid>
          <Grid item sm={6}>
            <Typography variant="h6">Request</Typography>
            <Codeblock language="js" value={CreateOneCode} />
          </Grid>
        </Grid>
        <Divider className={classes.divider} />

        {/* Delete Structure groups */}
        <Grid container spacing={3} className={classes.marginTop}>
          <Grid item sm={6}>
            <ResourceDescription
              title="Delete Structure Groups"
              verb="DELETE"
              url="/api/structures-groups/delete"
              description="Deletes the specified structure groups from the database. Marks the delete_flag field as true versus actually deleting the record. Responds with an HTTP status code of 200 if successful." />
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

export default withStyles(styles, { withTheme: true })(StructureTypesAPI);