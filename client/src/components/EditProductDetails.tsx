import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Product } from "./Products";
import { Box, Grid, TextField } from "@mui/material";
import axios from "axios";

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

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}

interface EditProductDialogsProps {
  product: Product;
}

export default function EditProductDialogs(props: EditProductDialogsProps) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const fetchData = async () => {
      try {
        await axios
          .post("http://localhost:3000/admin//product/:id", {
            fullname: firstname + " " + lastname,
            username: email,
            password: password,
          })
          .then((response) => {
            const data = response.data;
            if (data.token) localStorage.setItem("token", data.token);
          })
          .catch((error) => {
            throw error;
          });
        navigate("/");
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>Edit</Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogContent dividers>
          <EditForm product={props.product} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button autoFocus onClick={handleSubmit} sx={{ bgcolor: "black" }}>
            Submit
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}

interface EditFormProps extends EditProductDialogsProps {}

const EditForm: React.FC<EditFormProps> = ({ product }) => {
  const { category, title, description, imageUrl, quantity } = product;
  return (
    <Box display="flex">
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <TextField
            name="category"
            required
            id="category"
            label="Category"
            defaultValue={category}
            autoFocus
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            name="quantity"
            required
            id="quantity"
            label="Quantity"
            defaultValue={quantity}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="title"
            required
            fullWidth
            id="title"
            label="Title"
            defaultValue={title}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="description"
            required
            fullWidth
            id="description"
            label="Description"
            defaultValue={description}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            name="imageUrl"
            required
            fullWidth
            id="imageUrl"
            label="Image URL"
            defaultValue={imageUrl}
          />
        </Grid>
      </Grid>
    </Box>
  );
};
