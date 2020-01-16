import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';

export default function AlertDialog(props) {
  const { handleDelete } = props;
  const [open, setOpen] = useState(false);

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  function dialogHandler(consent) {
    if (consent === 'agree') {
      handleDelete();
    }
    handleClose();
  }

  return (
    <div>
      <Tooltip title="Delete" onClick={handleClickOpen}>
        <IconButton aria-label="Delete">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Record Delete"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this record(s)? Doing so cannot be undone
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => dialogHandler('disagree')} color="primary">
            Cancel
          </Button>
          <Button onClick={() => dialogHandler('agree')} color="secondary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}