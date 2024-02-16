import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Button } from "./button";
import { faChain, faPlay, faTrash } from "@fortawesome/free-solid-svg-icons";

const MoviesItem = () => {
  return (
    <div>
      <div className="relative">
        <img
          className="w-full"
          src="https://dummyimage.com/500x250"
          alt="dummy-image"
        />
        <Button className="absolute top-16 right-5 bg-piloup rounded-md text-white p-4  hover:bg-primary m-2">
          <FontAwesomeIcon icon={faPlay} />
        </Button>
        <Button className="absolute top-28 right-5 bg-piloup rounded-md text-white p-4  hover:bg-red-700 my-5 mx-2">
          <FontAwesomeIcon icon={faTrash} />
        </Button>
      </div>
    </div>
  );
};
export { MoviesItem };
