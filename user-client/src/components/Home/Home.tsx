import { useEffect, useState } from "react";
import { Box, Card, CardMedia, Grid, Stack } from "@mui/material";
import HomeNavIcons from "./HomeNavIcons";
import axios from "axios";
import Banner from "./BannerCarousel";

interface Product {
  _id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  quantity: number;
}

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3000/user/products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <Box margin={2}>
      <HomeNavIcons />
      <Banner />
      <Box>
        {/* <Typography variant="h6" padding="100px 0">
          Top Deals
        </Typography> */}
        <Grid
          container
          item
          xs={10}
          spacing={2}
          display="flex"
          flexWrap="nowrap"
          sx={{ overflowX: "scroll" }}
        >
          <Stack direction="row" spacing={2}>
            {products.map((product) => (
              <Card key={product._id}>
                <CardMedia
                  sx={{
                    minWidth: 200,
                    height: 300,
                  }}
                  image={product.imageUrl}
                  title={product.title}
                />
              </Card>
            ))}
          </Stack>
        </Grid>
        <Card>
          <CardMedia
            sx={{
              height: 350,
            }}
            image="https://rukminim1.flixcart.com/fk-p-flap/530/810/image/674093f0167f6014.jpg?q=20"
            title="offers card"
          />
        </Card>
      </Box>
    </Box>
  );
};

export default Home;
