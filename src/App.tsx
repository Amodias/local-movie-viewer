import React, { useEffect, useState } from "react";
import "../node_modules/video-react/dist/video-react.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Player } from "video-react";
import QRCode from "react-qr-code";
import { Home } from "./pages/Home";

function App() {
  const [serverIpAddress, setServerIpAddress] = useState("");

  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    setServerIpAddress(`http://${hostname}:${port}`);
  });

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="users/:id" element={<Users />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
