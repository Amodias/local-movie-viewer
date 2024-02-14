import React from "react";
import "../node_modules/video-react/dist/video-react.css";
import { Player } from "video-react";

function App() {
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
      <div className="grid justify-items-center">
        <div className="w-1/2 h-1/2 ">
          <Player
            playsInline
            src="/movies/sample/pexels-thirdman-5538262.mp4"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
