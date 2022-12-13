import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogTitle,
  DialogActions,
  Button,
} from "@mui/material";
import React from "react";

const DynamicModel = ({
  open,
  toggle,
  dialogTitle,
  dialogContentText,
  children,
  confirmText,
  cancelText,
  isClose = false,
}) => {
  return (
    <div>
      <Dialog isOpen={open} toggle={toggle}>
        <DialogTitle>{dialogTitle}</DialogTitle>

        <DialogContent>
          <DialogContentText>{dialogContentText}</DialogContentText>
          {children}
        </DialogContent>
        <DialogActions>
          {isClose && (
            <Button
              onClick={() => {
                toggle();
              }}
            >
              {cancelText}
            </Button>
          )}
          <Button>{confirmText}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DynamicModel;
