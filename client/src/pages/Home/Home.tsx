import React, { useEffect } from "react";
import { MovieSection, SelectionsSection, UtilsSection } from "./sections";
import { MovieProvider } from "../../contexts/MovieContext";
import { useIPContext } from "../../contexts/IPContext";

const Home = () => {
  const { setIP } = useIPContext();

  useEffect(() => {
    const hostname = window.location.hostname;
    setIP(hostname + ":8000");
  }, []);

  return (
    <MovieProvider>
      <div className=" grid grid-cols-6 p-10 gap-8">
        <div className="col-span-4 bg-primary rounded-lg">
          <MovieSection />
        </div>
        <div className="col-span-2 bg-primary p-10 rounded-lg">
          <div className="bg-secondary rounded">
            <UtilsSection />
          </div>
          <div className="bg-secondary rounded mt-5 p-5">
            <SelectionsSection />
          </div>
        </div>
      </div>
    </MovieProvider>
  );
};

export { Home };
