import React, { useMemo } from "react";
import { Paper } from "@material-ui/core";
import MaterialTable from "material-table";
import useFetchData from "../../../hooks/useFetchData";

const SummaryTable = (props) => {
  const [TableData, isLoading] = useFetchData(
    "recharge-accounting/summary/annual/unlagged",
    []
  );
  const columns = useMemo(() => {
    if (TableData.length > 0 && !isLoading) {
      const excludedKeys = [
        "recharge_project_desc",
        "structure_desc",
        "web_record_key",
        "tableData",
      ];
      let columns = [
        {
          title: "Project",
          field: "recharge_project_desc",
          cellStyle: { minWidth: 175 },
        },
        {
          title: "Structure",
          field: "structure_desc",
          cellStyle: { minWidth: 175 },
        },
      ];
      const keys = Object.keys(TableData[0]);
      keys.map((key) => {
        if (!excludedKeys.includes(key)) {
          columns.push({
            title: key,
            field: key,
          });
        }
        return null;
      });
      return columns;
    }
    return [];
  }, [TableData, isLoading]);
  return (
    <MaterialTable
      columns={columns}
      data={TableData}
      isLoading={isLoading}
      title="Unlagged Recharge Summary"
      components={{
        Container: (props) => {
          return <Paper elevation={0} {...props} />;
        },
      }}
      options={{
        padding: "dense",
        pageSize: 15,
        pageSizeOptions: [15, 30, 60],
        maxBodyHeight: 600,
      }}
    />
  );
};

export default SummaryTable;
