import React, { useContext, useEffect, useState } from "react";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { MovieProvider, useMovieContext } from "@/src/contexts/MovieContext";
import { MoviesItem } from "../../../components/movies-item";

const SelectionsSection = () => {
  const [movies, setMovies] = useState([]);
  const hostname = window.location.hostname;

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch(`http://${hostname}:8000/movies`);
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        console.error("Failed to fetch movies:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <ScrollArea className="h-[680px]  rounded-md p-5">
      <div className="space-y-10">
        {movies.map((movie, index) => (
          <MoviesItem key={index} url={movie} />
        ))}
      </div>
    </ScrollArea>
  );
};

export { SelectionsSection };
