import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { IPProvider } from "./contexts/IPContext";

import Cinema from "./pages/Cinema";

const App = () => {
  return (
    <IPProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cinema/:x" element={<Cinema />} />
        </Routes>
      </BrowserRouter>
    </IPProvider>
  );
};

export default App;
