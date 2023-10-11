import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { Grid, Paper } from "@mui/material";
import { CustomizedDialogsProps, DialogTitleProps } from "./types";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(5),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiGrid-root .MuiGrid-item": {
    padding: 0,
  },
}));

function BootstrapDialogTitle(props: DialogTitleProps) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

export default function CustomizedDialogs(props: CustomizedDialogsProps) {
  const [open, setOpen] = React.useState(false);
  const { category, title, description, imageUrl, quantity, mrp, sell } = props.product;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>View</Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <Typography paddingRight="50px">
            <b>{title}</b>
          </Typography>
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Paper sx={{ marginBottom: 2 }}>
                <b>Category:</b> {category}
              </Paper>
              <Paper sx={{ marginBottom: 2 }}>
                <b>Description:</b> {description}
              </Paper>
              <Paper sx={{ marginBottom: 2, padding: 1, lineHeight: 2 }}>
                <b>QTY:</b> {quantity}
                <br />
                <b>MRP:</b> {mrp}
                <br />
                <b>SELL:</b> {sell}
              </Paper>
            </Grid>
            <Grid
              item
              xs={6}
              display="flex"
              justifyContent="flex-end"
              boxShadow="rgba(0, 0, 0, 0.8)"
            >
              <img src={imageUrl} alt="" style={{ maxHeight: 200 }} />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Close View
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
