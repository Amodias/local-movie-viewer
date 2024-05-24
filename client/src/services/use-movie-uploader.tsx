import { useDropzone } from "react-dropzone";
import { useIndexedDB } from "react-indexed-db-hook";

const useMovieUploader = () => {
  const { add } = useIndexedDB("movies");
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": ["*"],
    },
    onDrop: async (acceptedFiles) => {
      for (const file of acceptedFiles) {
        const url = await readFileAsDataURL(file);
        add({ url }).then(
          () => console.log("Movie added successfully"),
          (error) => console.error("Error adding movie:", error)
        );
      }
    },
  });

  return { getRootProps, getInputProps };
};

const readFileAsDataURL = (file: File) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default useMovieUploader;
