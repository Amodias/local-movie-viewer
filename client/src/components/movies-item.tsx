import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "../components/ui/button";
import { faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useMovieContext } from "../contexts/MovieContext";
import { useHostContext } from "../contexts/HostContext";
import axios from "axios";
import { useMovieUploaderContext } from "../contexts/MovieUploaderContext";

interface MovieItemProps {
  movie: {
    id: number;
    name: string;
    path: string;
    imagePath: string;
  };
}

const MoviesItem: React.FC<MovieItemProps> = ({ movie }) => {
  const { setMoviePath } = useMovieContext();
  const { setUploadedMovie } = useMovieUploaderContext();
  const { serverHost } = useHostContext();

  const handlePlayButtonClick = () => {
    setMoviePath(movie.path);
  };

  const handleDeleteButtonClick = async () => {
    try {
      await axios.delete(`${serverHost}/movies/${movie.id}`);
      setUploadedMovie("+");
      setUploadedMovie("");
    } catch (error) {
      console.error("Error deleting movie:", error);
    }
  };

  return (
    <div>
      <div className="relative">
        <img
          className="w-full"
          src={serverHost + movie.imagePath}
          alt={movie.name}
        />
        <Button
          className="absolute top-10 right-5 bg-piloup rounded-md text-white p-4 hover:bg-primary m-2"
          onClick={handlePlayButtonClick}
        >
          <FontAwesomeIcon icon={faPlay} />
        </Button>
        <Button
          className="absolute top-24 right-5 bg-piloup rounded-md text-white p-4 hover:bg-red-700 my-5 mx-2"
          onClick={handleDeleteButtonClick}
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  );
};

export { MoviesItem };
