import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable from "material-table";

const useStyles = makeStyles(theme => ({
  mainContent: {
    margin: theme.spacing(5),
    maxWidth: "100%",
  },
}));

const ReportData = ({ title, data, columns, loading }) => {
  const classes = useStyles();

  return (
    <div className={classes.mainContent}>
      <MaterialTable
        title={title}
        columns={columns}
        data={data}
        isLoading={loading}
        editable={{}}
        options={{
          exportAllData: true,
          grouping: true,
          columnsButton: true,
          exportButton: true,
          pageSize: 30,
          pageSizeOptions: [15, 30, 60],
          maxBodyHeight: 600,
          padding: "dense",
        }}
      />
    </div>
  );
};

export default ReportData;
