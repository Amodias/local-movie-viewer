import React, { useEffect, useState } from "react";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { MoviesItem } from "../../../components/movies-item";
import { useHostContext } from "../../../contexts/HostContext";
import axios from "axios";

const SelectionsSection = () => {
  const [movies, setMovies] = useState<string[]>([]);
  const { serverHost } = useHostContext();

  useEffect(() => {
    if (serverHost) {
      fetchMovies();
    }
  }, [serverHost]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(`${serverHost}/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <ScrollArea className="h-[680px] rounded-md p-5">
      <div className="space-y-10">
        {movies.map((movie, index) => (
          <MoviesItem key={index} url={movie} />
        ))}
      </div>
    </ScrollArea>
  );
};

export { SelectionsSection };
