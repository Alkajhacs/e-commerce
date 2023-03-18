
import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DialogBox(props) {
  const {buttonText = "", title = "", content = "", showCancel = "", confirmButtonText = "", handleClose = () => {}, handleConfirm = ()=> {}, handleClickOpen = () => {}, showConfirmDialog = false} = props;

  return (
    <div>
      <Dialog
        open={showConfirmDialog}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {showCancel && (
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
          )}
          <Button onClick={handleConfirm} color="primary" autoFocus>
            {confirmButtonText}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DialogBox;


