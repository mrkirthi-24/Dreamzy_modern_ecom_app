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
  const { product } = props;
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState(product.category);
  const [title, setTitle] = React.useState(product.title);
  const [description, setDescription] = React.useState(product.description);
  const [quantity, setQuantity] = React.useState(product.quantity);
  const [imageUrl, setImageUrl] = React.useState(product.imageUrl);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const editData = async () => {
      try {
        await axios({
          method: "PUT",
          url: `http://localhost:3000/admin//product/${product._id}`,
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            "Content-Type": "application/json",
          },
          data: {
            category,
            title,
            description,
            quantity,
            imageUrl,
          },
        })
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    editData();
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
          <Box display="flex">
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  name="category"
                  required
                  id="category"
                  label="Category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  autoFocus
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  name="quantity"
                  required
                  id="quantity"
                  label="Quantity"
                  value={quantity.toString()}
                  onChange={(e) => setQuantity(parseInt(e.target.value))}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="description"
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  name="imageUrl"
                  required
                  fullWidth
                  id="imageUrl"
                  label="Image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
              </Grid>
            </Grid>
          </Box>
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
