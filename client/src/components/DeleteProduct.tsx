import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { authTokenState } from "../store/selectors/authToken";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { productsState } from "../store/atoms/products";
import { snackbarState } from "../store/atoms/snackbar";

type Props = {
  productId: string;
};

const DeleteProduct: React.FC<Props> = ({ productId }) => {
  const [open, setOpen] = React.useState(false);
  const setProductState = useSetRecoilState(productsState);
  const setAlert = useSetRecoilState(snackbarState);
  const authToken = useRecoilValue(authTokenState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = async () => {
    const deleteData = async () => {
      try {
        await axios({
          method: "DELETE",
          url: `http://localhost:3000/admin/product/${productId}`,
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
        })
          .then((response) => {
            console.log(response.data);
            setProductState(() => ({
              products: response.data.products,
            }));
            setAlert((prevState) => ({
              ...prevState,
              open: true,
              message: "Product deleted successfully",
            }));
            handleClose();
          })
          .catch((error) => {
            throw error;
          });
      } catch (error) {
        console.error("Error deleteing data:", error);
      }
    };
    deleteData();
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        <DeleteIcon fontSize="small" />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product forever?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            Delete Forever
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteProduct;
