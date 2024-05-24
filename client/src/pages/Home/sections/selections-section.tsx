import React, { useEffect, useState } from "react";
import { useIndexedDB } from "react-indexed-db-hook";
import { MoviesItem } from "../../../components/movies-item";
import { ScrollArea } from "../../../components/ui/scroll-area";

const SelectionsSection = () => {
  const [movies, setMovies] = useState([]);
  const { getAll } = useIndexedDB("movies");
  useEffect(() => {
    getAll().then((movies) => {
      //@ts-ignore
      setMovies(movies);
    });
  }, []);

  return (
    <ScrollArea className="h-[680px]  rounded-md p-5">
      <div className="space-y-10">
        {movies.map((movie) => (
          //@ts-ignore
          <MoviesItem id={movie.id} url={movie.url} />
        ))}
      </div>
    </ScrollArea>
  );
};

export { SelectionsSection };
