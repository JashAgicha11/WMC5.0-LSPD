import Hero from "./components/Interface/Hero"
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicOnlyRoute from "./utils/PublicOnlyRoute";
import PrivateOnlyRoute from "./utils/PrivateOnlyRoute";
import Adminonlyroute from "./utils/Adminonlyroute";
import StationScreen from "./components/Station/StationScreen"
import JailScreen from "./components/Jail/JailScreen";
import OfficeScreen from "./components/Office/OfficeScreen";
import Login from "./components/pages/SignIn"
import Signup from "./components/pages/SignUp"
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import SnackbarManager from "./context/SnackBarManager";
import Face from "../src/components/Station/Face"


const App = () => {
  return (
    <ThemeProvider theme={theme}>
    <SnackbarManager />
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PublicOnlyRoute Component={Hero} />} />
        <Route path="/station" element={<PublicOnlyRoute Component={StationScreen} />} />
        <Route path="/jail" element={<PublicOnlyRoute Component={JailScreen} />} />
        <Route path="/face" element={<PublicOnlyRoute Component={Face} />} />
        <Route path="/office" element={<Adminonlyroute Component={OfficeScreen} />} />
        <Route path="/login" element={<PublicOnlyRoute Component={Login} />} />
        <Route path="/signup" element={<PublicOnlyRoute Component={Signup} />} />
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
