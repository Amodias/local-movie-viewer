import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Cinema from "./pages/Cinema";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cinema/:x" element={<Cinema />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
