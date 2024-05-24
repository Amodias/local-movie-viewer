import React, { createContext, useContext, useState, ReactNode } from "react";

interface HostContextType {
  clientHost: string | null;
  setClientHost: React.Dispatch<React.SetStateAction<string | null>>;
  serverHost: string | null;
  setServerHost: React.Dispatch<React.SetStateAction<string | null>>;
}

const HostContext = createContext<HostContextType>({
  clientHost: null,
  setClientHost: () => {}, // Placeholder function
  serverHost: null,
  setServerHost: () => {}, // Placeholder function
});

export const HostProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [clientHost, setClientHost] = useState<string | null>(null);
  const [serverHost, setServerHost] = useState<string | null>(null);

  return (
    <HostContext.Provider
      value={{ clientHost, setClientHost, serverHost, setServerHost }}
    >
      {children}
    </HostContext.Provider>
  );
};

export const useHostContext = (): HostContextType => useContext(HostContext);
