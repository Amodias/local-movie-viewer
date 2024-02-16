import React from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";

const UtilsSection = () => {
  return (
    <div className="grid grid-cols-6  p-5 gap-10">
      <div className="col-span-4 ">
        <Input
          className="text-pilop bg-white w-full"
          placeholder="Search a movie"
        />
      </div>
      <div className="col-span-2 sm:col-span-1">
        <Button className="bg-piloup text-white w-full sm:text-sm">
          Link a movie
        </Button>
      </div>
    </div>
  );
};

export { UtilsSection };
