import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../../components/ui/dialog";
import { useMovieUploaderContext } from "../../../contexts/MovieUploaderContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const UtilsSection = () => {
  const {
    getRootProps,
    getInputProps,
    isLoading,
    uploadedMovie,
    setUploadedMovie,
  } = useMovieUploaderContext();
  const [movieName, setMovieName] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const dialogCloseRef = useRef(null);
  const linkMovie = () => {
    if (fileInputRef.current && !uploadedMovie) {
      fileInputRef.current.click();
    }
  };

  const onCloseButtonClick = () => {
    if (dialogCloseRef.current) {
      // @ts-ignore
      dialogCloseRef.current.click();
      setTimeout(() => {
        setUploadedMovie("");
      }, 500);
    }
  };

  return (
    <div className="">
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-piloup text-white w-full sm:text-sm">
            Link a movie
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] bg-slate-200">
          <DialogHeader>
            <DialogTitle>Movie Linker Form</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Input
              id="name"
              value={movieName}
              placeholder="Movie name"
              onChange={(e) => setMovieName(e.target.value)}
            />
          </div>
          <div {...getRootProps()}>
            <input
              type="file"
              ref={fileInputRef}
              disabled={!!uploadedMovie}
              onChange={(e) => {}}
              style={{ display: "none" }}
              {...getInputProps()}
            />
            <Button
              className=" text-white w-full sm:text-sm flex-row "
              onClick={linkMovie}
              disabled={!!uploadedMovie}
            >
              <p>
                {!!uploadedMovie
                  ? " Movie Uploaded"
                  : isLoading
                  ? "Uploading..."
                  : "Upload the Movie"}
              </p>
              {isLoading && <FontAwesomeIcon icon={faSpinner} spin />}
            </Button>
          </div>
          <DialogFooter>
            <DialogClose asChild ref={dialogCloseRef}>
              <Button
                className="bg-piloup text-white w-full sm:text-sm"
                type="button"
                onClick={onCloseButtonClick}
              >
                Finish
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export { UtilsSection };
