import React, { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";

import { Player } from "video-react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
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
      <div className=" px-5 pb-2">
        <Player playsInline src="/movies/sample/pexels-thirdman-5538262.mp4" />
      </div>
      <div className="grid justify-center">
        <Popover>
          <PopoverTrigger className="bg-piloup text-white p-3 rounded-md ">
            <FontAwesomeIcon icon={faQrcode} size="2x" />
          </PopoverTrigger>
          <PopoverContent>
            <QRCode value={serverIpAddress} className="" />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export { MovieSection };
