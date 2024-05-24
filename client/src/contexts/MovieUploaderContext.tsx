import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  Dispatch,
  SetStateAction,
} from "react";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { useHostContext } from "./HostContext";

interface MovieUploaderContextType {
  isLoading: boolean;
  uploadedMovie: string | null;
  getRootProps: () => any;
  setUploadedMovie: Dispatch<SetStateAction<string | null>>; // Corrected type
  getInputProps: () => any;
}

const MovieUploaderContext = createContext<MovieUploaderContextType>({
  isLoading: false,
  uploadedMovie: null,
  getRootProps: () => ({}),
  setUploadedMovie: () => {}, // Adjusted default value
  getInputProps: () => ({}),
});

export const MovieUploaderProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [uploadedMovie, setUploadedMovie] = useState<string | null>(null);
  const { serverHost } = useHostContext();

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setIsLoading(true);
      for (const file of acceptedFiles) {
        const formData = new FormData();
        formData.append("file", file);

        try {
          const response = await axios.post(`${serverHost}/upload`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
          setUploadedMovie(response.data.filePath);
          console.log("File uploaded successfully:", response.data);
        } catch (error) {
          console.error("Error uploading file:", error);
        } finally {
          setIsLoading(false);
        }
      }
    },
    [serverHost]
  );

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": ["*"],
    },
    onDrop,
  });

  return (
    <MovieUploaderContext.Provider
      value={{
        isLoading,
        uploadedMovie,
        getRootProps,
        getInputProps,
        setUploadedMovie,
      }}
    >
      {children}
    </MovieUploaderContext.Provider>
  );
};

export const useMovieUploaderContext = () => useContext(MovieUploaderContext);
