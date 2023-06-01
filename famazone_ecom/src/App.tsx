import React from "react";
import { ThemeProvider } from "@mui/material";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { theme } from "./shared/utils/theme";
import HomePage from "./pages/Home";
import RegisterPage from "./pages/Register";
import SignInPage from "./pages/SignIn";
import PrivateRoute from "./features/auth/component/PrivateRoute";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Routes>
          <Route path="/" element={<PrivateRoute page={<HomePage />} />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="*" element={<Navigate to={"/signin"} />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
