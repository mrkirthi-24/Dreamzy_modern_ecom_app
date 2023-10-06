import {
  Box,
  Link,
  styled,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { Product } from "../../store/atoms/productState";
import { LocalOffer as Badge } from "@mui/icons-material";
import GradeIcon from "@mui/icons-material/Grade";
interface ItemDetailsProps {
  item: Product | null;
}

const ItemDetails: React.FC<ItemDetailsProps> = ({ item }) => {
  const adURL =
    "https://rukminim1.flixcart.com/lockin/774/185/images/CCO__PP_2019-07-14.png?q=50";

  const date = new Date(new Date().getTime() + 5 * 24 * 60 * 60 * 1000);

  const offerDescriptions = [
    "Bank Offer 5% Unlimited Cashback on Flipkart Axis Bank Credit Card",
    "Bank Offer 10% Off on Bank of Baroda Mastercard debit card first time transaction, Terms and Condition apply",
    "Purchase this Furniture or Appliance and Get Extra ₹500 Off on Select ACs",
    "Partner OfferExtra 10% off upto ₹500 on next furniture purchase"
  ];

  return (
    <Box padding={5}>
      <Typography variant="h5">{item?.title}</Typography>
      <Typography style={{ marginTop: 5 }}>
        <Link
          href="#"
          color="#fff"
          sx={{ textDecoration: "none", display: "flex" }}
        >
          <Box
            component="span"
            bgcolor="green"
            padding="1px 5px"
            borderRadius="4px"
            fontSize="12px"
            display="flex"
            alignItems="center"
            fontWeight={900}
          >
            4.3&nbsp;
            <span style={{ fontSize: "14px", marginTop: 2 }}>
              <GradeIcon fontSize="inherit" />
            </span>
          </Box>
          <Box component="span" color="black" fontSize="14px">
            &nbsp;&nbsp;8 Ratings & 1 Reviews
          </Box>
        </Link>
      </Typography>
      <Typography mt={2}>
        <span style={{ fontSize: 28, fontWeight: 900 }}>₹{item?.sell}</span>
        &nbsp;&nbsp;&nbsp;
        <span style={{ color: "#878787", textDecoration: "line-through" }}>
          ₹{item?.mrp}
        </span>
        &nbsp;&nbsp;&nbsp;
        <span style={{ color: "#388E3C", fontWeight: 600 }}>
          {item && Math.round(((item.mrp - item.sell) / item.mrp) * 100)}% OFF
        </span>
      </Typography>

      <Typography>Available offers</Typography>
      <SmallText>
      {offerDescriptions.map((description, index) => (
        <Typography key={index}>
          <StyledBadge />
          {description}
        </Typography>
      ))}
    </SmallText>
      <Table>
        <TableBody>
          <ColumnText>
            <TableCell style={{ color: "#878787" }}>Delivery</TableCell>
            <TableCell style={{ fontWeight: 600 }}>
              Delivery by {date.toDateString()} | ₹40
            </TableCell>
          </ColumnText>
          <ColumnText>
            <TableCell style={{ color: "#878787" }}>Warranty</TableCell>
            <TableCell>No Warranty</TableCell>
          </ColumnText>
          <ColumnText>
            <TableCell style={{ color: "#878787" }}>Seller</TableCell>
            <TableCell>
              <span style={{ color: "#2874f0" }}>SuperComNet</span>
              <Typography>GST invoice available</Typography>
              <Typography>View more sellers starting from ₹329</Typography>
            </TableCell>
          </ColumnText>
          <TableRow>
            <TableCell colSpan={2}>
              <img src={adURL} style={{ width: 390 }} />
            </TableCell>
          </TableRow>
          <ColumnText>
            <TableCell style={{ color: "#878787" }}>Description</TableCell>
            <TableCell>{item?.description}</TableCell>
          </ColumnText>
        </TableBody>
      </Table>
    </Box>
  );
};

//Styled Components ----------------------------------------------------------------

const SmallText = styled(Box)`
  font-size: 14px;
  vertical-align: baseline;
  & > p {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const ColumnText = styled(TableRow)`
  font-size: 14px;
  vertical-align: baseline;
  & > td {
    font-size: 14px;
    margin-top: 10px;
  }
`;

const StyledBadge = styled(Badge)`
  margin-right: 10px;
  color: #00cc00;
  font-size: 15px;
`;

export default ItemDetails;
