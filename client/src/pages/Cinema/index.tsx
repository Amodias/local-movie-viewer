import React from "react";
import { useParams } from "react-router-dom";
import { Player } from "video-react";

const Cinema = () => {
  const hostname = window.location.hostname;
  const { x } = useParams();

  return (
    <div className="px-5 pb-2 pt-10">
      <div className="grid justify-center">
        <img className=" " src="logo.png" alt="Logo" />
      </div>
      {x ? (
        <Player playsInline src={`http://${hostname}:8000/media/` + x} />
      ) : (
        <div className="grid justify-center">
          <img className=" " src="logo.png" alt="Logo" />
        </div>
      )}
    </div>
  );
};

export default Cinema;
