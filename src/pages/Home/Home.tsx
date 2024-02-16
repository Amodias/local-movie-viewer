import React from "react";
import { MovieSection, SelectionsSection, UtilsSection } from "./sections";

const Home = () => {
  return (
    <div className=" grid grid-cols-6 p-10 gap-8">
      <div className="col-span-4 bg-primary rounded-lg">
        <MovieSection />
      </div>
      <div className="col-span-2 bg-primary p-10 rounded-lg">
        <div className="bg-secondary">
          <UtilsSection />
        </div>
        <SelectionsSection />
      </div>
    </div>
  );
};

export { Home };
