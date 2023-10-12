import { Box, Grid } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import { singleItemState } from "../../store/atoms/singleItemState";
import ItemActions from "./ItemActions";
import ItemDetails from "./ItemDetails";

const ProductDetails = () => {
  const itemId = useParams<{ productId: string }>();
  const [item, setItem] = useRecoilState(singleItemState);

  useEffect(() => {
    // Scroll to the top of the page when the component mounts
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchItem = async () => {
      const response = await axios.get(
        `${import.meta.env.VITE_BASE_URL}/product/${itemId.productId}`
      );
      const data = response.data;
      setItem(() => ({
        loading: false,
        singleItem: data[0],
      }));
    };

    fetchItem();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <Grid container>
        <Grid item lg={4} md={4} sm={8} xs={12}>
          <ItemActions item={item.singleItem} loading={item.loading} />
        </Grid>
        <Grid item lg={8} md={8} sm={8} xs={12}>
          <ItemDetails item={item.singleItem} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductDetails;
