import { Card, CardMedia, Stack, styled, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { productCategory } from "../constants";

const HomeNavIcons: React.FC = () => {
  return (
    <Stack
      spacing={5}
      direction="row"
      display="flex"
      justifyContent="center"
      padding={2}
      marginBottom={2}
      sx={{ backgroundColor: "rgba(0,0,0,0.1)" }}
    >
      {productCategory.map((category, index) => {
        return (
          <Link to={category.link} key={index}>
            <StyledCard>
              <CardMedia
                sx={{ width: 64, height: 64 }}
                image={category.image}
                title={category.title}
              />
              <Typography variant="subtitle2" fontWeight={600}>
                {category.title}
              </Typography>
            </StyledCard>
          </Link>
        );
      })}
    </Stack>
  );
};

// Styled Components ----------------------------------------------------------------

const StyledCard = styled(Card)`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 20px;
  border-radius: 5%;
  background-color: white;
  color: black;
`;

export default HomeNavIcons;
