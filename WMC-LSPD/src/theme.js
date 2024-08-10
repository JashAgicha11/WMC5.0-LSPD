import { createTheme, styled } from "@mui/material";

const theme = createTheme({
  components: {
    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: {
          vertical: "top",
          horizontal: "center",
        },
        ContentProps:{
            sx:{
              borderRadius: "1rem",
              transition:"all",
              color: "black",
              bgcolor: "white",
              fontWeight: "bold",
              textAlign:"center",
              display:"flex",
              justifyContent:"center",
              alignItems:"center"
            }
           }
      },
    },
    MuiSnackbarContent: {
      styleOverrides: {
        message: {
          fontWeight: 600,
          textTransform: "capitalize",
          textAlign:"center",
          fontFamily:"poppins",
          fontSize:"15px"
        },
      },
    },
    
  },
});

export default theme 
