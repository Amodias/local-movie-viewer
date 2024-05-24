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
        <AppInit />
      </BrowserRouter>
    </HostProvider>
  );
};

const AppInit = () => {
  const { setClientHost, setServerHost } = useHostContext();

  useEffect(() => {
    const updateHost = () => {
      const hostname = window.location.hostname;
      setClientHost("http://" + hostname + ":3000");
      setServerHost("http://" + hostname + ":8000");
    };

    updateHost();
  }, [setClientHost, setServerHost]);

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/cinema/:x" element={<Cinema />} />
    </Routes>
  );
};
export default App;
