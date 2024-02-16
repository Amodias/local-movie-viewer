import React from "react";
import { MoviesItem } from "../../../components/ui/movies-item";
import { ScrollArea } from "../../../components/ui/scroll-area";
const SelectionsSection = () => {
  return (
    <ScrollArea className="h-[680px]  rounded-md p-5">
      <div className="space-y-10">
        <MoviesItem />
        <MoviesItem />
        <MoviesItem />
      </div>
    </ScrollArea>
  );
};

export { SelectionsSection };
