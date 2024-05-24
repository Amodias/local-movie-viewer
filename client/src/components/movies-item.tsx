import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { faChain, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useIndexedDB } from "react-indexed-db-hook";
import { useMovieContext } from "../contexts/MovieContext";

const MoviesItem = ({ url }: { url: string }) => {
  const { setMoviePath } = useMovieContext();
  const handlePlayButtonClick = () => {
    setMoviePath(url);
  };

  return (
    <div>
      <div className="relative">
        <img
          className="w-full"
          src="https://dummyimage.com/500x250"
          alt="movie-thumbnail"
        />
        <Button
          className="absolute top-10 right-5 bg-piloup rounded-md text-white p-4  hover:bg-primary m-2"
          onClick={handlePlayButtonClick}
        >
          <FontAwesomeIcon icon={faPlay} />
        </Button>
        <Button className="absolute top-24 right-5 bg-piloup rounded-md text-white p-4  hover:bg-red-700 my-5 mx-2">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  );
};

export { MoviesItem };
