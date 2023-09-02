import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { Box, Card, CardMedia, Grid, Stack, Typography } from "@mui/material";

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

  const productCategory = [
    {
      image:
        "https://rukminim1.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100",
      title: "Grocery",
      link: "/products?category=grocery",
    },
    {
      image:
        "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/0d75b34f7d8fbcb3.png?q=100",
      title: "Fashion",
      link: "/products/grocery",
    },
    {
      image:
        "https://rukminim1.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100",
      title: "Mobiles",
      link: "/products/grocery",
    },
    {
      image:
        "https://rukminim1.flixcart.com/flap/64/64/image/ab7e2b022a4587dd.jpg?q=100",
      title: "Home & Furniture",
      link: "/products/grocery",
    },
    {
      image:
        "https://rukminim1.flixcart.com/flap/64/64/image/69c6589653afdb9a.png?q=100",
      title: "Electronics",
      link: "/products/grocery",
    },
    {
      image:
        "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
      title: "Beauty & Toys",
      link: "/products/grocery",
    },
    {
      image:
        "https://rukminim1.flixcart.com/flap/64/64/image/71050627a56b4693.png?q=100",
      title: "Travel",
      link: "/products/grocery",
    },
  ];

  const items = [
    <div className="item">
      <img
        src="https://storiesflistgv2.blob.core.windows.net/stories/2017/09/mehengaai_mainbanner.jpg"
        width="100%"
        height={400}
      />
    </div>,
    <div className="item">
      <img
        src="https://img.freepik.com/free-psd/black-friday-super-sale-facebook-cover-template_106176-1577.jpg?w=2000"
        width="100%"
        height={400}
      />
    </div>,
    <div className="item">
      <img
        src="https://cdn.paisawapas.com/static/flipkart-sale-landing-page-mob-banner.png"
        width="100%"
        height={400}
      />
    </div>,
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3000/user/products");
      setProducts(response.data);
    };
    fetchProducts();
  }, []);

  return (
    <Box margin={2}>
      <Stack
        spacing={5}
        direction="row"
        display="flex"
        justifyContent="center"
        bgcolor="yellow"
        padding={2}
        marginBottom={2}
      >
        {productCategory.map((category, index) => {
          return (
            <Link to={category.link} key={index}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  padding: "10px 20px",
                  borderRadius: 0,
                  backgroundColor: "white",
                  color: "black",
                }}
              >
                <CardMedia
                  sx={{
                    width: 64,
                    height: 64,
                  }}
                  image={category.image}
                  title={category.title}
                />
                <Typography variant="subtitle2" fontWeight={600}>
                  {category.title}
                </Typography>
              </Card>
            </Link>
          );
        })}
      </Stack>
      <Box>
        <AliceCarousel
          infinite
          items={items}
          autoPlay
          autoPlayInterval={3000}
          disableDotsControls
          disableButtonsControls
        />
      </Box>
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
