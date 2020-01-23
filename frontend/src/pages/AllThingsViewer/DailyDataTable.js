import React from "react";
import { makeStyles } from "@material-ui/core/styles";
// import ListTable from "../../components/ListTable";
import NewListTable from "../../components/NewListTable";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
  },
  mainContent: {
    padding: theme.spacing(3),
  },
  paper: {
    padding: theme.spacing(2),
  },
}));

const DailyDataTable = ({ data, columns, filters, columnToggles }) => {
  const classes = useStyles();

  return (
    // <ListTable
    //   data={data}
    //   columns={columns}
    //   title="Daily Data Crosstab"
    //   size="small"
    //   stickyHeader={true}
    //   selectionsEnabled={false}
    //   toggleColumns={true}
    // />

    <NewListTable
      data={data}
      columns={columns}
      filters={filters}
      columnToggles={columnToggles}
      title="Daily Data Crosstab"
      size="small"
      stickyHeader={true}
      height={650}
    />
  );
};

export default DailyDataTable;
