import {
  Box,
  Button,
  Grid,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import CreateProductDialog from "./CreateProduct";
import axios from "axios";
import { useRecoilState } from "recoil";
import { productsState } from "../store/atoms/products";
import { ProductCard } from "./ProductCard";

const Products = () => {
  const navigate = useNavigate();
  const [productState, setProductState] = useRecoilState(productsState);

  useEffect(() => {
    const fetchProducts = async () => {
      await axios(`${import.meta.env.VITE_BASE_URL}/products`, 
      { 
        method: 'GET',
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          "Content-Type": "application/json",
        }
       })
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
          <CreateProductDialog />
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
          <Box
            width="95%"
            display="flex"
            justifyContent="space-between"
            flexWrap="wrap"
          >
            {productState.products.map((product, index) => (
              <ProductCard key={index} product={product} showAction={true} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Products;
