import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipes from "./pages/Recipes";
import Splash from "./pages/Splash";
import { ThemeProvider, createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
      light: "#42a5f5",
      dark: "#1565c0"
    },
    secondary: {
      main: "#9c27b0",
      light: "#ba68c8",
      dark: "#7b1fa2"
    }
  }
})

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route exact path= "/" element={<Splash />} />
          <Route exact path="/recipes" element={<Recipes />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>

  );
}

export default App;
