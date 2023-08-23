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
import AddBoxIcon from "@mui/icons-material/AddBox";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import EditProductDetails from "./EditProductDetails";
import ViewProductDetails from "./ViewProductDetails";
import axios from "axios";

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
  const [products, setProducts] = useState([]);

  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    "Content-Type": "application/json",
  };

  useEffect(() => {
    const fetchProducts = async () => {
      await axios
        .get("http://localhost:3000/admin/products", { headers })
        .then((response) => {
          setProducts(response.data);
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
          <Button variant="contained">
            <AddBoxIcon /> &nbsp; Create Product
          </Button>
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
          <GetProducts products={products} />
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
  const { title, description, imageUrl } = product;
  return (
    <Card sx={{ minWidth: 250, maxWidth: 250, marginBottom: 5 }}>
      <CardMedia sx={{ height: 200 }} image={imageUrl} title={title} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {showAction && (
        <CardActions>
          <ViewProductDetails product={product} />
          <EditProductDetails product={product} />
        </CardActions>
      )}
    </Card>
  );
};

export default Products;
