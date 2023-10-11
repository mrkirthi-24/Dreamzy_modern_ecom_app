import { Box, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { ProductCardProps } from "./types";
import EditProductDialog from "./EditProductDetails";
import ViewProductDetails from "./ViewProductDetails";
import DeleteProduct from "./DeleteProduct";
import { calculateDiscount } from "../utils/calculateDiscount";


export const ProductCard: React.FC<ProductCardProps> = ({
    product,
    showAction,
  }) => {
    const { title, description, imageUrl, quantity, category, mrp, sell } =
      product;
    const image = imageUrl
      ? imageUrl
      : "https://static-assets-web.flixcart.com/www/linchpin/batman-returns/images/fk-default-image-75ff340b.png?q=90";
    return (
      <Card sx={CardStyles}>
        <CardMedia sx={{ height: 200 }} image={image} title={title} />
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
          <Typography
            variant="body2"
            color="text.secondary"
            display="flex"
            justifyContent="space-between"
            mt={1}
            mb={5}
          >
            <span>
              MRP: ₹<b>{mrp}</b>
            </span>
            <span>
              Sell Price: ₹<b>{sell}</b>
            </span>
            <span style={{ color: "green" }}>
              Discount: {calculateDiscount(mrp, sell)}%
            </span>
          </Typography>
        </CardContent>
        {showAction && (
          <CardActions sx={CardActionStyles}>
            <Box display="flex">
              <ViewProductDetails product={product} />
              <EditProductDialog product={product} />
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