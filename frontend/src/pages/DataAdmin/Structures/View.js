import React from "react";
import PropTypes from "prop-types";
import ViewListItems from "../../../components/DataAdmin/ViewListItems";

const View = ({ history }) => {
  // API endpoint for retrieving/deleting data
  const endpoint = "data-managenent/structures";

  // table title
  const title = "Structures";

  // name of primary key field
  const keyField = "structure_ndx";

  // Columns to include in the table
  const columns = [
    {
      id: "structure_desc",
      numeric: false,
      disablePadding: false,
      label: "Name",
      chip: false,
    },
  ];

  // columns to include in the active list item sidebar
  const sidebarColumns = [{ id: "structure_desc", label: "Name" }];

  // Configure sidebar map settings
  const mapSettings = {
    enabled: false,
    latField: "lat_dd",
    lonField: "lon_dd",
  };

  return (
    <ViewListItems
      history={history}
      title={title}
      endpoint={endpoint}
      keyField={keyField}
      columns={columns}
      sidebarColumns={sidebarColumns}
      mapSettings={mapSettings}
    />
  );
};

View.propTypes = {
  history: PropTypes.object.isRequired,
};

export default View;
