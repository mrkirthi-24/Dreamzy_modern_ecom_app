import { Box } from "@mui/material";
import HomeNavIcons from "./HomeNavIcons";
import Banner from "./BannerCarousel";
import ProductSlide from "./ProductSlide";

const Home: React.FC = () => {
  return (
    <Box margin={2}>
      <HomeNavIcons />
      <Banner />
      <ProductSlide title="Deals of the Day" timer={true} />
      <ProductSlide title="Latest Trends 😍" timer={false} />
      <ProductSlide title="Recommended for you" timer={false} />
    </Box>
  );
};

export default Home;
