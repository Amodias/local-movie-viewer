import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useHostContext } from "../contexts/HostContext";

const useMovieUploader = () => {
  const { serverHost } = useHostContext();
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": ["*"],
    },
    onDrop: async (acceptedFiles) => {
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axios.post(`${serverHost}/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
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
