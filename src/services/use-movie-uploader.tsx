import { useState } from "react";
import { useDropzone } from "react-dropzone";

const useMovieUploader = () => {
  const [movieUrl, setMovieUrl] = useState("");
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": ["*"],
    },
    onDrop: (acceptedFiles) => {
      const movie = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        //@ts-ignore
        setMovieUrl(reader.result);
      };
      reader.readAsDataURL(movie);
    },
  });

  return { movieUrl, getRootProps, getInputProps };
};

export default useMovieUploader;
