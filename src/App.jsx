import React from "react";
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Recipes from "./pages/Recipes";
import Splash from "./pages/Splash";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path= "/" element={<Splash />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
