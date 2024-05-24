import axios from "axios";
import { useDropzone } from "react-dropzone";

const useMovieUploader = () => {
  const hostname = window.location.hostname;
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": ["*"],
    },
    onDrop: async (acceptedFiles) => {
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axios.post(
            `http://${hostname}:8000/upload`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          console.log("File uploaded successfully:", response.data);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    },
  });
  return { getRootProps, getInputProps };
};

export default useMovieUploader;
