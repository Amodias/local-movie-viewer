import React, { createContext, useContext, useState, ReactNode } from "react";

interface MovieContextType {
  moviePath: string | null;
  setMoviePath: React.Dispatch<React.SetStateAction<string | null>>;
}

const MovieContext = createContext<MovieContextType>({
  moviePath: null,
  setMoviePath: () => {}, // Placeholder function
});

export const MovieProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [moviePath, setMoviePath] = useState<string | null>(null);

  return (
    <MovieContext.Provider value={{ moviePath, setMoviePath }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = (): MovieContextType => useContext(MovieContext);
