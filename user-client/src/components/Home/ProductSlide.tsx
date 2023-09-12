import { useEffect } from "react";
import { Box, IconButton, styled, Typography } from "@mui/material";
import axios from "axios";
import { useRecoilState } from "recoil";
import { productState } from "../../store/atoms/productState";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { Link } from "react-router-dom";
import Countdown from "react-countdown";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";

interface ProductSlideProps {
  title: string;
  timer: boolean;
}

const ProductSlide: React.FC<ProductSlideProps> = ({ title, timer }) => {
  const [allproductState, setProductState] = useRecoilState(productState);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get("http://localhost:3000/user/products");
      setProductState(() => ({ products: response.data }));
    };
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 5,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const timerURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

  interface RendererProps {
    hours: number;
    minutes: number;
    seconds: number;
  }

  const renderer: React.FC<RendererProps> = ({ hours, minutes, seconds }) => {
    return (
      <Box>
        {hours} : {minutes} : {seconds} Left
      </Box>
    );
  };

  return (
    <Wrapper>
      <Deal>
        <SlideHeader>{title}</SlideHeader>
        {timer && (
          <Timer>
            <img src={timerURL} style={{ width: 24 }} alt="time clock" /> &nbsp;
            <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
          </Timer>
        )}
        <IconButton sx={{ marginLeft: "auto" }}>
          <ArrowCircleRightIcon fontSize="large" color="primary" />
        </IconButton>
      </Deal>

      <Carousel
        responsive={responsive}
        swipeable={false}
        draggable={false}
        centerMode={true}
        infinite={true}
        autoPlay={false}
        autoPlaySpeed={2000}
        keyBoardControl={true}
        showDots={false}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
      >
        {allproductState.products.map((product) => (
          <Link
            key={product._id}
            to={`product/${product._id}`}
            style={{ textDecoration: "none" }}
          >
            <Box
              textAlign="center"
              style={{
                padding: "20px 10px",
                border: "1px solid rgba(0,0,0,0.25)",
                margin: 5,
              }}
            >
              <Image src={product.imageUrl} />
              <Text style={{ fontWeight: 600 }}>{product.title}</Text>
              <Text style={{ color: "green" }}>Upto 50% OFF</Text>
            </Box>
          </Link>
        ))}
      </Carousel>
    </Wrapper>
  );
};

//Styled Components ----------------------------------------------------------------

const Wrapper = styled(Box)`
  margin-top: 10px;
  padding: 10px;
`;

const SlideHeader = styled(Typography)`
  font-size: 22px;
  font-weight: 600;
  line-height: 32px;
  padding: 10px;
  display: flex;
  align-items: center;
`;

const Deal = styled(Box)`
  display: flex;
  padding: 10px;
`;

const Timer = styled(Box)`
  color: #7f7f7f;
  margin-left: 10px;
  display: flex;
  align-items: center;
`;

const Image = styled("img")({
  width: "auto",
  height: 150,
});

const Text = styled(Typography)`
  font-size: 14px;
  margin-top: 5px;
`;

export default ProductSlide;
