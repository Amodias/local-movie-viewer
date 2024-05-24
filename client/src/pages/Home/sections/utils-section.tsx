import React, { useRef } from "react";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import useMovieUploader from "../../../services/use-movie-uploader";

const UtilsSection = () => {
  const { getRootProps, getInputProps } = useMovieUploader();
  const fileInputRef = useRef(null);

  const linkMovie = () => {
    if (fileInputRef.current) {
      //@ts-ignore
      fileInputRef.current.click();
    }
  };
  return (
    <div className="grid grid-cols-6 p-5 gap-10">
      <div className="col-span-4">
        <Input
          disabled
          className="text-pilop bg-white w-full"
          placeholder="Search a movie"
        />
      </div>
      <div className="col-span-2 sm:col-span-1" {...getRootProps()}>
        <input ref={fileInputRef} {...getInputProps()} className="hidden" />
        <Button
          className="bg-piloup text-white w-full sm:text-sm"
          onClick={linkMovie}
        >
          Link a movie
        </Button>
      </div>
    </div>
  );
};

export { UtilsSection };
