import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
  IconButton,
} from "@mui/material";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";

const DynamicModel = ({
  open = false,
  toggle,
  dialogTitle,
  children,
  confirmText = "Create",
  cancelText = "Close",
  onClickConfirm,
  isClose = false,
  maxWidth = "md",
  isActions = true,
}) => {
  return (
    <Dialog open={open} fullWidth maxWidth={maxWidth}>
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        {dialogTitle}
        <IconButton
          aria-label="close"
          onClick={toggle}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CancelOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      {isActions && (
        <DialogActions>
          {isClose && (
            <Button onClick={toggle} variant="text" color="info">
              {cancelText}
            </Button>
          )}
          <Button onClick={onClickConfirm} variant="contained" color="primary">
            {confirmText}
          </Button>
        </DialogActions>
      )}
    </Dialog>
  );
};

export default DynamicModel;
