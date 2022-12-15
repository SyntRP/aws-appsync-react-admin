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
  isClose = false,
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
        {isClose && <Button onClick={toggle}>{cancelText}</Button>}
        <Button onClick={onClickConfirm}>{confirmText}</Button>
      </DialogActions>
    </Dialog>
  );
};

export default DynamicModel;
