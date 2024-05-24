import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { HostProvider } from "./contexts/HostContext";
import { useHostContext } from "./contexts/HostContext";

import Cinema from "./pages/Cinema";

const App = () => {
  return (
    <HostProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cinema/:x" element={<Cinema />} />
        </Routes>
      </BrowserRouter>
    </HostProvider>
  );
};

export default App;
