import React, { createContext, useContext, useState, ReactNode } from "react";

interface MovieContextType {
  movieId: string | number | null;
  setMovieId: React.Dispatch<React.SetStateAction<string | number | null>>;
}

const MovieContext = createContext<MovieContextType>({
  movieId: null,
  setMovieId: () => {}, // Placeholder function
});

export const MovieProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [movieId, setMovieId] = useState<string | number | null>(null);

  return (
    <MovieContext.Provider value={{ movieId, setMovieId }}>
      {children}
    </MovieContext.Provider>
  );
};

export const useMovieContext = (): MovieContextType => useContext(MovieContext);
