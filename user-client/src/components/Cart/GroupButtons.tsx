import { useState } from "react";

import { ButtonGroup, Button, styled } from "@mui/material";

const GroupButtons = () => {
  const [counter, setCounter] = useState(1);

  const handleIncrement = () => {
    setCounter((counter) => counter + 1);
  };

  const handleDecrement = () => {
    setCounter((counter) => counter - 1);
  };

  return (
    <Component>
      <StyledButton
        variant="contained"
        onClick={() => handleDecrement()}
        disabled={counter == 1}
      >
        -
      </StyledButton>
      <Button disabled>{counter}</Button>
      <StyledButton variant="contained" onClick={() => handleIncrement()}>
        +
      </StyledButton>
    </Component>
  );
};

//Styled Components ----------------------------------------------------------------

const Component = styled(ButtonGroup)`
  margin-top: 22px;
`;

const StyledButton = styled(Button)`
  font-size: 18px;
`;

export default GroupButtons;
