//import React, { useMemo } from "react";
import React from "react";
import PropTypes from "prop-types";
import axios from "axios";
import MaterialTable from "material-table";
import { makeStyles } from "@material-ui/core/styles";
import useFetchData from "../../../hooks/useFetchData";
import useFormSubmitStatus from "../../../hooks/useFormSubmitStatus";
import { useAuth0 } from "../../../hooks/auth";
import FormSnackbar from "../../../components/FormSnackbar";
import CustomEditField from "../../../components/MaterialTable/CustomEditField";

const useStyles = makeStyles((theme) => ({
  materialTable: {
    "& th:last-child": {
      textAlign: "left!important",
    },
  },
  toolbar: {
    paddingLeft: theme.spacing(2),
  },
  filterBtn: {
    marginTop: theme.spacing(1),
  },
}));

const WellAttributesTable = ({ refreshSwitch, meters }) => {
  const classes = useStyles();
  const {
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();
  const { getTokenSilently } = useAuth0();

  const [
    tableData,
    isLoading,
    setTableData,
  ] = useFetchData("members-management/well-attributes", [
    refreshSwitch,
  ]);

//  const formattedReaches = useMemo(() => {
//    let converted = {};
//    if (reaches.length > 0) {
//      reaches.forEach((d) => {
//        converted[d.reach_index] = d.reach_name;
//      });
//    }
//    return converted;
//  }, [reaches]);

  const columns = [
    { title: "WDID", field: "wdid" },
    { title: "Permit No.", field: "permit_no" },
    { title: "Reach", field: "reach_index",
//      lookup: formattedReaches,
    },
    { title: "Admin No.", field: "admin_no" },
    { title: "Glover-Xft", field: "glover_x" },
    { title: "Glover-Wft", field: "glover_w" },
    { title: "Glover-Tgpdf", field: "glover_t_gpdf" },
    { title: "SurfaceDiv", field: "treat_div_as_surface" },
//    { title: "Notes", field: "notes" },
  ];

  const submitUpdate = async (record) => {
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(
        `${process.env.REACT_APP_ENDPOINT}/api/members-management/well-attributes`,
        record,
        { headers }
      );
      setWaitingState("complete", "no error");
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
    }
  };

  const submitDelete = async (record) => {
    setWaitingState("in progress");
    const rec = { ...record };
    rec.invalid = true;
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.put(
        `${process.env.REACT_APP_ENDPOINT}/api/members-management/well-attributes`,
        rec,
        { headers }
      );
      setWaitingState("complete", "no error");
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
    }
  };

  const handleUpdate = (newData, oldData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        if (oldData) {
          setTableData((prevState) => {
            const data = [...prevState];
            data[data.indexOf(oldData)] = newData;
            submitUpdate(newData);
            return data;
          });
        }
      }, 600);
    });
  };

  const handleDelete = (oldData) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve();
        if (oldData) {
          setTableData((prevState) => {
            const data = [...prevState];
            data.splice(data.indexOf(oldData), 1);
            submitDelete(oldData);
            return data;
          });
        }
      }, 600);
    });
  };

  return (
    <div className={classes.materialTable}>
      <MaterialTable
        title="Review and Edit Well Attributes"
        columns={columns}
        data={tableData}
        isLoading={isLoading}
        editable={{
          onRowUpdate: handleUpdate,
          onRowDelete: handleDelete,
        }}
        components={{
          EditField: (props) => {
            return <CustomEditField {...props} />;
          },
        }}
        options={{
          actionsCellStyle: { justifyContent: "center" },
          //          actionsColumnIndex: -1,
          pageSize: 30,
          pageSizeOptions: [15, 30, 60],
          maxBodyHeight: 600,
          padding: "dense",
        }}
      />
      <FormSnackbar
        open={snackbarOpen}
        error={snackbarError}
        handleClose={handleSnackbarClose}
        successMessage="Success"
        errorMessage="Error"
      />
    </div>
  );
};

WellAttributesTable.propTypes = {
  refreshSwitch: PropTypes.bool.isRequired,
};

export default WellAttributesTable;
