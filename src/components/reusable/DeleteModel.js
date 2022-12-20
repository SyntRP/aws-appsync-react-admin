import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
} from "@mui/material";
import React from "react";

function DeleteModel({
  open,
  toggle,
  dialogTitle,
  dialogContentText,
  onClickConfirm,
  isClose = true,
}) {
  return (
    <>
      <Dialog open={open} toggle={toggle} aria-labelledby="form-dialog-title">
        <FormControl>
          <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText color="error">
              {dialogContentText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {isClose && (
              <Button onClick={toggle} color="error">
                Cancel
              </Button>
            )}
            <Button
              onClick={onClickConfirm}
              type="submit"
              color="primary"
              variant="contained"
            >
              Delete
            </Button>
          </DialogActions>
        </FormControl>
      </Dialog>
    </>
  );
}

export default DeleteModel;
