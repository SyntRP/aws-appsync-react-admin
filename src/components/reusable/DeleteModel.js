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

const DeleteModel = ({
  open,
  toggle,
  dialogTitle,
  dialogContentText,
  onClickConfirm,
  isClose = true,
}) => {
  return (
    <>
      <Dialog open={open} aria-labelledby="form-dialog-title">
        <FormControl>
          <DialogTitle id="form-dialog-title">{dialogTitle}</DialogTitle>
          <DialogContent>
            <DialogContentText color="error">
              {dialogContentText}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            {isClose && (
              <Button onClick={toggle} color="error" variant="contained">
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
};

export default DeleteModel;
