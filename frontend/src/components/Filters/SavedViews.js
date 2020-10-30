import React, {useState} from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { Typography, Chip } from "@material-ui/core";
import useFetchData from "../../hooks/useFetchData";
import { goTo } from "../../util";
import axios from "axios";
import useFormSubmitStatus from "../../hooks/useFormSubmitStatus";
import {useAuth0} from "../../hooks/auth";
import FormSnackbar from "../FormSnackbar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  savedViews: {
    margin: theme.spacing(2),
  },
  chipCloud: {
    width: "100%",
  },
  chip: {
    margin: theme.spacing(0, 1, 1, 0),
  },
  divider: {
    margin: theme.spacing(2, 0),
  },
}));

const SavedViews = ({ endpoint }) => {
  const classes = useStyles();
  let history = useHistory();
  let match = useRouteMatch();
  const [refreshViews, setRefreshViews] = useState(false);
  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);
  const [savedViews] = useFetchData(endpoint, [match, refreshViews]);
  const [currentChipData, setCurrentChipData] = useState({});
  const { getTokenSilently } = useAuth0();

  const {
    setWaitingState,
    snackbarOpen,
    snackbarError,
    handleSnackbarClose,
  } = useFormSubmitStatus();

  const handleSelectView = chip => {
    const pathSplit = match.path.split("/:viewNdx")[0];
    const pathTrimmed = pathSplit.substring(1, pathSplit.length);
    goTo(history, `${pathTrimmed}/${chip.view_ndx}`);
  };

  const handleDeleteView = async (chip) => {
    setConfirmDeleteOpen(true);
    setCurrentChipData(chip);
  };

  const handleConfirmDelete = async () => {
    setWaitingState("in progress");
    try {
      const token = await getTokenSilently();
      const headers = { Authorization: `Bearer ${token}` };
      await axios.delete(
          `${process.env.REACT_APP_ENDPOINT}/api/${endpoint}/${currentChipData.view_ndx}`,
          { headers }
      );
      setRefreshViews(!refreshViews);
      setConfirmDeleteOpen(false);
      setWaitingState("complete", "no error");
    } catch (err) {
      console.error(err);
      setWaitingState("complete", "error");
    }
  };

  const handleConfirmClose = () => {
    setConfirmDeleteOpen(false);
  };

  return (
    <div className={classes.savedViews}>
      <Typography variant="h6" gutterBottom>
        Saved Views
      </Typography>
      <div className={classes.chipCloud}>
        {savedViews.length === 0 && "None"}
        {savedViews.map(chip => (
          <Chip
            key={chip.view_ndx}
            label={chip.view_name}
            className={classes.chip}
            onClick={() => handleSelectView(chip)}
            onDelete={() => handleDeleteView(chip)}
          />
        ))}
      </div>

      <Dialog
          open={confirmDeleteOpen}
          onClose={handleConfirmClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Saved View?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete the <strong>{currentChipData.view_name}</strong> saved view?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="primary" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>

      <FormSnackbar
          open={snackbarOpen}
          error={snackbarError}
          handleClose={handleSnackbarClose}
          successMessage="View deleted successfully"
          errorMessage="View could not be deleted"
      />
    </div>
  );
};

export default SavedViews;
