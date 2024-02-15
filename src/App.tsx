import React, { useEffect, useState } from "react";
import "../node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";
import QRCode from "react-qr-code";

function App() {
  const [serverIpAddress, setServerIpAddress] = useState("");

  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    setServerIpAddress(`http://${hostname}:${port}`);
  });

  return (
    <div className="container gap-5 p-5">
      <header className="p-5">
        <div className="grid grid-cols-5">
          <div className="col-span-1"></div>
          <div className="col-span-3">
            <input type="text" placeholder="search here" />
          </div>
          <div className="col-span-1"></div>
        </div>
      </header>
      <div className="grid justify-items-center grid-cols-3">
        <div className="w-1/2 h-1/2 col-span-2">
          <Player
            playsInline
            src="/movies/sample/pexels-thirdman-5538262.mp4"
          />
        </div>
        <div className="col-span-1">
          <QRCode value={serverIpAddress} />
        </div>
      </div>
    </div>
  );
}

export default App;
