import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import EditProductDetails from "./EditProductDetails";
import ViewProductDetails from "./ViewProductDetails";
import CreateProduct from "./CreateProduct";

import axios from "axios";
import DeleteProduct from "./DeleteProduct";
import { useRecoilState } from "recoil";
import { productsState } from "../store/atoms/products";

export interface Product {
  _id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  quantity: number;
}

interface ProductCardProps {
  key?: number;
  product: Product;
  showAction?: boolean;
}

interface GetProductsProps {
  products: Product[];
}

const Products = () => {
  const navigate = useNavigate();
  const [productState, setProductState] = useRecoilState(productsState);

  const headers = {
    Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await axios
        .get("http://localhost:3000/admin/products", { headers })
        .then((response) => {
          setProductState(() => ({
            products: response.data,
          }));
        })
        .catch((error) => {
          console.error(error);
        });
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Grid container mt={2} display="flex" justifyContent="flex-end">
        <Grid item xs={2} mr={-2.5}>
          <CreateProduct />
        </Grid>
        <Grid item xs={2}>
          <Button
            variant="contained"
            onClick={() => {
              navigate("/");
            }}
          >
            <HomeIcon /> &nbsp; Go to Home page
          </Button>
        </Grid>
        <Grid item xs={12} mt={5} display="flex" justifyContent="center">
          <GetProducts products={productState.products} />
        </Grid>
      </Grid>
    </Box>
  );
};

const GetProducts: React.FC<GetProductsProps> = ({ products }) => {
  return (
    <Box
      width="95%"
      display="flex"
      justifyContent="space-between"
      flexWrap="wrap"
    >
      {products.map((product, index) => (
        <ProductCard key={index} product={product} showAction={true} />
      ))}
    </Box>
  );
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  showAction,
}) => {
  const { title, description, imageUrl, quantity, category } = product;
  return (
    <Card sx={CardStyles}>
      <CardMedia sx={{ height: 200 }} image={imageUrl} title={title} />
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
      {showAction && (
        <CardActions sx={CardActionStyles}>
          <Box display="flex">
            <ViewProductDetails product={product} />
            <EditProductDetails product={product} />
          </Box>
          <DeleteProduct productId={product._id} />
        </CardActions>
      )}
    </Card>
  );
};

//Component styles ----------------------------------------------------------------

const CardStyles = {
  minWidth: 250,
  maxWidth: 250,
  minHeight: 400,
  marginBottom: 5,
  position: "relative",
};

const CardActionStyles = {
  display: "flex",
  justifyContent: "space-between",
  position: "absolute",
  width: "100%",
  bottom: 0,
  borderTop: "1px solid rgba(0, 0, 0, 0.1)",
};

export default Products;
