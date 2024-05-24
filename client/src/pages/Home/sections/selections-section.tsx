import React, { useEffect, useState } from "react";
import { ScrollArea } from "../../../components/ui/scroll-area";
import { MoviesItem } from "../../../components/movies-item";
import { useHostContext } from "../../../contexts/HostContext";
import { useMovieUploaderContext } from "../../../contexts/MovieUploaderContext";
import axios from "axios";

interface Movie {
  id: number;
  name: string;
  path: string;
  imagePath: string;
}

const SelectionsSection: React.FC = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const { serverHost } = useHostContext();
  const { uploadedMovie } = useMovieUploaderContext();

  useEffect(() => {
    if (serverHost) {
      fetchMovies();
    }
  }, [serverHost, uploadedMovie]);

  const fetchMovies = async () => {
    try {
      const response = await axios.get<Movie[]>(`${serverHost}/movies`);
      setMovies(response.data);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <ScrollArea className="h-[680px] rounded-md p-5">
      <div className="space-y-10">
        {movies.map((movie) => (
          <MoviesItem key={movie.id} movie={movie} />
        ))}
      </div>
    </ScrollArea>
  );
};

export { SelectionsSection };
