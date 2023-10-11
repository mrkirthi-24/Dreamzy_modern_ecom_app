import { ChangeEvent, forwardRef, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import AddBoxIcon from "@mui/icons-material/AddBox";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputAdornment,
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authTokenState } from "../store/selectors/authToken";
import { productsState } from "../store/atoms/products";
import { snackbarState } from "../store/atoms/snackbar";
import { calculateDiscount } from "../utils/calculateDiscount";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const productInitialValues = {
  category: "",
  title: "",
  description: "",
  imageUrl: "",
  mrp: 0,
  sell: 0,
  quantity: 0,
};

const CreateProductDialog: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [productDetails, setProductDetails] = useState(productInitialValues);
  const setProductState = useSetRecoilState(productsState);
  const setAlert = useSetRecoilState(snackbarState);
  const authToken = useRecoilValue(authTokenState);

  const onInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let parsedValue: (string | number) = e.target.value;

    if (e.target.name === "quantity" || e.target.name === "mrp" || e.target.name === "sell") {
      parsedValue = parseFloat(e.target.value);
  }
    setProductDetails({ ...productDetails, [e.target.name]: parsedValue });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const createData = async () => {
      try {
        await axios(`${import.meta.env.VITE_BASE_URL}/createproduct`, {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
          },
          data: { ...productDetails },
        })
          .then((response) => {
            setProductState(() => ({
              products: response.data,
            }));
            setProductDetails(productInitialValues);
            handleClose();
            setAlert((prevState) => ({
              ...prevState,
              open: true,
              message: "Product created successfully",
            }));
          })
          .catch((error) => {
            console.log(error.message);
          });
      } catch (error) {
        console.error("Error sending data:", error);
      }
    };
    createData();
  };

  return (
    <div>
      <Button variant="contained" onClick={handleClickOpen}>
        <AddBoxIcon /> &nbsp; Create Product
      </Button>
      <Dialog
        fullScreen
        open={open}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create Product
            </Typography>
            <Button autoFocus color="inherit" onClick={handleSubmit}>
              Submit
            </Button>
          </Toolbar>
        </AppBar>

        <Box padding={3}>
          {/* Product Card display */}
          <Box display="flex" justifyContent="center">
            <Card sx={{ minWidth: 250, maxWidth: 250, marginBottom: 4 }}>
              <CardMedia
                component="img"
                alt={productDetails.title}
                height="200"
                image={productDetails.imageUrl}
              />
              <CardContent>
                <Typography
                  gutterBottom
                  component="div"
                  fontSize={12}
                  display="flex"
                  justifyContent="space-between"
                >
                  <span>
                    Category:
                    <b>
                      {productDetails.category.length > 10
                        ? productDetails.category.substring(0, 10) + "..."
                        : productDetails.category}
                    </b>
                  </span>
                  <Box display="flex" flexDirection="column">
                    <span>
                      Qty: <b>{productDetails.quantity}</b>
                    </span>
                  </Box>
                </Typography>
                <Box>
                  <Typography gutterBottom variant="h5" component="div">
                    {productDetails.title.length > 21
                      ? productDetails.title.substring(0, 21) + "..."
                      : productDetails.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {productDetails.description.length > 35
                      ? productDetails.description.substring(0, 35) + "..."
                      : productDetails.description}
                  </Typography>
                  <Typography
                    gutterBottom
                    variant="body2"
                    mt={2}
                    display="flex"
                    justifyContent="space-between"
                  >
                    <span>
                      MRP: ₹<b>{productDetails.mrp}</b>
                    </span>
                    &nbsp;{" "}
                    <span>
                      Sell: ₹<b>{productDetails.sell}</b>
                    </span>
                  </Typography>
                  <Typography fontSize={10} color="green">
                    Discount:&nbsp;
                    <b>
                      {calculateDiscount(
                        productDetails.mrp,
                        productDetails.sell
                      )}
                    </b>
                    %
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Box>

          {/* Enter product details */}
          <Grid container spacing={2} padding="0 50px">
            <Grid item xs={4}>
              <TextField
                fullWidth
                name="category"
                required
                id="category"
                label="Category"
                onChange={(e) => onInputChange(e)}
                autoFocus
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                fullWidth
                type="number"
                name="quantity"
                required
                id="quantity"
                label="Quantity"
                onChange={(e) => onInputChange(e)}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                type="number"
                name="mrp"
                required
                id="mrp"
                label="MRP"
                onChange={(e) => onInputChange(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                fullWidth
                type="number"
                name="sell"
                required
                id="sell"
                label="Sell Price"
                onChange={(e) => onInputChange(e)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">₹</InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="title"
                required
                fullWidth
                id="title"
                label="Title"
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
                onChange={(e) => onInputChange(e)}
              />
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
};

export default CreateProductDialog;
