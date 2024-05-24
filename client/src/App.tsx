import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import Cinema from "./pages/Cinema";

import { initDB } from "react-indexed-db-hook";
import DBConfig from "./DBConfig";

initDB(DBConfig);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cinema/:x" element={<Cinema />} />{" "}
        {/* Wrap Cinema component with Route */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
