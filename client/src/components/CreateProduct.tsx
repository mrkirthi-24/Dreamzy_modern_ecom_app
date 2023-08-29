import * as React from "react";
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
  TextField,
} from "@mui/material";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { authTokenState } from "../store/selectors/authToken";
import { productsState } from "../store/atoms/products";
import { snackbarState } from "../store/atoms/snackbar";

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function FullScreenDialog() {
  const [open, setOpen] = React.useState(false);
  const [category, setCategory] = React.useState("");
  const [title, setTitle] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [quantity, setQuantity] = React.useState<number>(0);
  const [imageUrl, setImageUrl] = React.useState("");
  const setProductState = useSetRecoilState(productsState);
  const setAlert = useSetRecoilState(snackbarState);
  const authToken = useRecoilValue(authTokenState);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    const createData = async () => {
      try {
        await axios("http://localhost:3000/admin/createproduct", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${authToken}`,
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
            setProductState(() => ({
              products: response.data,
            }));
            setCategory("");
            setQuantity(0);
            setDescription("");
            setTitle("");
            setImageUrl("");
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
                alt={title}
                height="200"
                image={imageUrl}
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
                    Category: <b>{category}</b>
                  </span>
                  <span>
                    Qty: <b>{quantity}</b>
                  </span>
                </Typography>
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {description}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          {/* Enter product details */}
          <Grid container spacing={2} padding="0 50px">
            <Grid item xs={6}>
              <TextField
                fullWidth
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
                fullWidth
                type="number"
                name="quantity"
                required
                id="quantity"
                label="Quantity"
                value={quantity}
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
      </Dialog>
    </div>
  );
}
