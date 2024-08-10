import { Snackbar } from "@mui/material";
import useStore from "../Store/store";


const SnackbarManager = () => {
  const { toastrMsg, setToastr } = useStore();

  return (
    <Snackbar
      message={toastrMsg}
      open={!!toastrMsg}
      autoHideDuration={4000}
      onClose={() => setToastr("")}
    />
  );
};

export default SnackbarManager;
