import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { Player } from "video-react";
const MovieSection = () => {
  const [serverIpAddress, setServerIpAddress] = useState("");

  useEffect(() => {
    const hostname = window.location.hostname;
    const port = window.location.port;
    setServerIpAddress(`http://${hostname}:${port}`);
  });

  return (
    <div className="h-full w-full">
      <div className="grid justify-center">
        <img className=" w-[90px] h-[100px] " src="logo.png" />
      </div>
      <div className=" px-5 pb-5">
        <Player playsInline src="/movies/sample/pexels-thirdman-5538262.mp4" />
      </div>
      <div className="grid justify-center pb-5">
        <QRCode value={serverIpAddress} className=" w-[100px] h-[100px]" />
      </div>
    </div>
  );
};

export { MovieSection };
