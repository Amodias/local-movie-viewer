import React, { useEffect } from "react";
import { MovieSection, SelectionsSection, UtilsSection } from "./sections";
import { MovieProvider } from "../../contexts/MovieContext";
import { useHostContext } from "../../contexts/HostContext";
import { MovieUploaderProvider } from "../../contexts/MovieUploaderContext";

const Home = () => {
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
    <MovieProvider>
      <MovieUploaderProvider>
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
      </MovieUploaderProvider>
    </MovieProvider>
  );
};

export { Home };
