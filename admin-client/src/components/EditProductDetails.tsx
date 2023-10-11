import axios from "axios";
import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import { Grid, TextField, Typography } from "@mui/material";
import { authTokenState } from "../store/selectors/authToken";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { productsState } from "../store/atoms/products";
import { EditProductDialogsProps } from "./types";
import { snackbarState } from "../store/atoms/snackbar";
import { calculateDiscount } from "../utils/calculateDiscount";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(5),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const EditProductDialog: React.FC<EditProductDialogsProps> = ({ product }) => {
  const productInitialValues = {
    category: product.category,
    title: product.title,
    description: product.description,
    imageUrl: product.imageUrl,
    mrp: product.mrp,
    sell: product.sell,
    quantity: product.quantity,
  };

  const [open, setOpen] = React.useState(false);
  const [editProduct, setEditProduct] = React.useState(productInitialValues);
  const authToken = useRecoilValue(authTokenState);
  const setProductState = useSetRecoilState(productsState);
  const setAlert = useSetRecoilState(snackbarState);

  const onInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let parsedValue: (string | number) = e.target.value;

    if (e.target.name === "quantity" || e.target.name === "mrp" || e.target.name === "sell") {
      parsedValue = parseFloat(e.target.value);
  }
    setEditProduct({ ...editProduct, [e.target.name] : parsedValue });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const editData = async () => {
      try {
        await axios(`${import.meta.env.VITE_BASE_URL}/product/${product._id}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          data: { ...editProduct },
        })
          .then((response) => {
            console.log(response.data);
            setProductState(() => ({
              products: response.data,
            }));
            setAlert((prevState) => ({
              ...prevState,
              open: true,
              message: "Product edited successfully",
            }));
            handleClose();
          })
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        console.error("Error editing data:", error);
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
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <TextField
                fullWidth
                name="category"
                required
                id="category"
                label="Category"
                value={editProduct.category}
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                name="quantity"
                required
                id="quantity"
                label="Quantity"
                value={editProduct.quantity}
                onChange={(e) => onInputChange(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                name="mrp"
                required
                id="mrp"
                label="MRP"
                value={editProduct.mrp}
                onChange={(e) => onInputChange(e)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                name="sell"
                required
                id="sell"
                label="Sell Price"
                value={editProduct.sell}
                onChange={(e) => onInputChange(e)}
              />
            </Grid>
            <Grid item xs={4} mt={0.3}>
              <Typography
                width="100%"
                color="green"
                border="1px dashed grey"
                padding={1.6}
              >
                Discount: {calculateDiscount(editProduct.mrp, editProduct.sell)}
                %
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
                value={editProduct.title}
                onChange={(e) => onInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="description"
                required
                fullWidth
                id="description"
                label="Description"
                value={editProduct.description}
                onChange={(e) => onInputChange(e)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="imageUrl"
                required
                fullWidth
                id="imageUrl"
                label="Image URL"
                value={editProduct.imageUrl}
                onChange={(e) => onInputChange(e)}
              />
            </Grid>
          </Grid>
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
};

export default EditProductDialog;
