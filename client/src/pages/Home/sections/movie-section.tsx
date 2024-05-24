import React, { useEffect, useState } from "react";
import "../../../../node_modules/video-react/dist/video-react.css";
import QRCode from "react-qr-code";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQrcode } from "@fortawesome/free-solid-svg-icons";
import { Player } from "video-react";
import { useMovieContext } from "../../../contexts/MovieContext";

const MovieSection = () => {
  const { moviePath } = useMovieContext();
  const [movieUrl, setMovieUrl] = useState("");
  const [serverIpAddress, setServerIpAddress] = useState("");
  const hostname = window.location.hostname;

  useEffect(() => {
    const port = window.location.port;
    setServerIpAddress(`http://${hostname}:${port}`);
  }, []);

  useEffect(() => {
    if (moviePath) {
      setMovieUrl(moviePath);
    }
  }, [moviePath]);

  return (
    <div className="h-full w-full">
      <div className="px-5 pb-2 pt-10">
        {moviePath ? (
          <Player
            playsInline
            src={`http://${hostname}:8000/media/` + movieUrl}
          />
        ) : (
          <div className="grid justify-center">
            <img className="  " src="logo.png" />
          </div>
        )}
      </div>
      <div className="grid justify-center">
        <Popover>
          <PopoverTrigger
            className="bg-piloup text-white p-3 rounded-md "
            disabled={moviePath ? false : true}
          >
            <FontAwesomeIcon icon={faQrcode} size="2x" />
          </PopoverTrigger>
          <PopoverContent>
            <QRCode value={serverIpAddress + "/cinema/" + movieUrl} />
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};

export { MovieSection };
