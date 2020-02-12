import React from "react";
import PropTypes from "prop-types";
import ViewListItems from "../../../components/DataAdmin/ViewListItems";

const View = ({ history }) => {
  // API endpoint for retrieving/deleting data
  const endpoint = "data-management/sources";

  // table title
  const title = "Sources";

  // name of primary key field
  const keyField = "source_ndx";

  // Columns to include in the table
  const columns = [
    {
      id: "source_desc",
      numeric: false,
      disablePadding: true,
      label: "Source Name",
      chip: false,
    },
    {
      id: "remark",
      numeric: false,
      disablePadding: false,
      label: "Notes",
      chip: false,
    },
  ];

  // columns to include in the active list item sidebar
  const sidebarColumns = [
    { id: "source_desc", label: "Source Name" },
    { id: "remark", label: "Notes" },
  ];

  return (
    <ViewListItems
      history={history}
      title={title}
      endpoint={endpoint}
      keyField={keyField}
      columns={columns}
      sidebarColumns={sidebarColumns}
    />
  );
};

View.propTypes = {
  history: PropTypes.object.isRequired,
};

export default View;