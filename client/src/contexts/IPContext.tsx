import React, { createContext, useContext, useState, ReactNode } from "react";

interface IPcontextType {
  IP: string | null;
  setIP: React.Dispatch<React.SetStateAction<string | null>>;
}

const IPContext = createContext<IPcontextType>({
  IP: null,
  setIP: () => {}, // Placeholder function
});

export const IPProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [IP, setIP] = useState<string | null>(null);

  return (
    <IPContext.Provider value={{ IP, setIP }}>{children}</IPContext.Provider>
  );
};

export const useIPContext = (): IPcontextType => useContext(IPContext);
