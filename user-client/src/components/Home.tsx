import { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { Link } from "react-router-dom";
import { Box, Card, CardMedia, Stack, Typography } from "@mui/material";
import axios from "axios";

const Home: React.FC = () => {
  //const [products, setProducts] = useState([]);

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
      <img src="https://shorturl.at/dgnEF" width="100%" height={250} />
    </div>,
    <div className="item">Item 2</div>,
    <div className="item">Item 3</div>,
  ];

  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const response = await axios.get("http://localhost:3000/user/products", {
  //       headers: {
  //         Authorization: "Bearer " + sessionStorage
  //       }
  //     });
  //     setProducts(response.data);
  //   };
  //   fetchProducts();
  // }, []);

  return (
    <Box margin={2}>
      <Stack
        spacing={5}
        direction="row"
        display="flex"
        justifyContent="center"
        bgcolor="yellow"
        padding={2}
        marginTop={10}
        marginBottom={2}
      >
        {productCategory.map((category) => {
          return (
            <Card
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                padding: "10px 20px",
                borderRadius: 0,
                backgroundColor: "white",
              }}
            >
              <CardMedia
                sx={{
                  width: 64,
                  height: 64,
                }}
                image={category.image}
                title="green iguana"
              />
              <Typography variant="subtitle2" fontWeight={600}>
                <Link to={category.link}>{category.title}</Link>
              </Typography>
            </Card>
          );
        })}
      </Stack>
      <Box marginBottom={2}>
        <AliceCarousel
          infinite
          items={items}
          autoPlay
          autoPlayInterval={3000}
          disableDotsControls
          disableButtonsControls
        />
      </Box>
      {/* <Box>
        <Stack
          spacing={2}
          padding={2}
          direction="row"
          display="flex"
          justifyContent="center"
          bgcolor="yellow"
          marginTop={10}
          marginBottom={2}
        >
          {products.map((product) => {
            <h6>{product.title}</h6>;
          })}
        </Stack>
      </Box> */}
    </Box>
  );
};

export default Home;
