import React, { useEffect, useState } from "react";
import { ScrollArea } from "../../../components/ui/scroll-area";

const SelectionsSection = () => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await fetch("http://localhost:8000/movies");
      if (response.ok) {
        const data = await response.json();
        setMovies(data);
      } else {
        console.error("Failed to fetch movies:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  return (
    <ScrollArea className="h-[680px]  rounded-md p-5">
      <div className="space-y-10">
        {movies.map((movie, index) => (
          <div key={index}>
            <video controls>
              <source src={`http://localhost:8000${movie}`} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

export { SelectionsSection };
