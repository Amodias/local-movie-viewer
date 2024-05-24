import React from "react";
import { useHostContext } from "../../contexts/HostContext";
import { useParams } from "react-router-dom";
import { Player } from "video-react";

const Cinema = () => {
  const { x } = useParams();

  const { serverHost } = useHostContext();

  return (
    <div className="px-5 pb-2 pt-10">
      <div className="grid justify-center">
        <img className=" " src="logo.png" alt="Logo" />
      </div>
      {x ? (
        <Player playsInline src={`${serverHost}/media/` + x} />
      ) : (
        // <Player playsInline src={`http://192.168.1.42:8000/media/` + x} />
        <div className="grid justify-center">
          <img className=" " src="logo.png" alt="Logo" />
        </div>
      )}
    </div>
  );
};

export default Cinema;
