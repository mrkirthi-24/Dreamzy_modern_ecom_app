import { Snackbar } from "@mui/material";
import MuiAlert from "@mui/material/Alert";
import { useRecoilState } from "recoil";
import { snackbarState } from "../store/atoms/snackbar";

const Alert: React.FC = () => {
  const [alert, setAlert] = useRecoilState(snackbarState);

  const handleClose = () => {
    setAlert({ ...alert, open: false });
  };

  return (
    <Snackbar open={alert.open} autoHideDuration={3000} onClose={handleClose}>
      <MuiAlert
        onClose={handleClose}
        severity={alert.type}
        variant="filled"
        elevation={10}
      >
        {alert.message}
      </MuiAlert>
    </Snackbar>
  );
};

export default Alert;
