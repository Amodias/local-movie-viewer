import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./ui/button";
import { faChain, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useIndexedDB } from "react-indexed-db-hook";

const MoviesItem = ({ url, id }: { url: string; id: number }) => {
  const { deleteRecord } = useIndexedDB("movies");

  const handleDelete = () => {
    deleteRecord(id).then(
      () => {
        console.log("Movie deleted successfully");
      },
      (error) => {
        console.error("Error deleting movie:", error);
      }
    );
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
          onClick={() => {
            // Handle play button click
          }}
        >
          <FontAwesomeIcon icon={faPlay} />
        </Button>
        <Button
          className="absolute top-24 right-5 bg-piloup rounded-md text-white p-4  hover:bg-red-700 my-5 mx-2"
          onClick={handleDelete} // Attach onClick handler to delete button
        >
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  );
};

export { MoviesItem };
