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
  open,
  toggle,
  dialogTitle,
  children,
  confirmText,
  cancelText,
  onClickConfirm,
  isClose = true,
}) => {
  return (
    <Dialog open={open} toggle={toggle} fullWidth maxWidth="md">
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
      <DialogActions>
        {isClose && (
          <Button onClick={toggle} color="error" variant="contained">
            {cancelText}
          </Button>
        )}
        <Button 
          onClick={onClickConfirm}
          type="submit"
          color="primary"
          variant="contained"
        >
          {confirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicModel;
