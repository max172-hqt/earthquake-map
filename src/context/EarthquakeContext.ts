import { createContext, useContext } from "react";

export interface EarthquakeContextValue {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  earthquakeData: Record<string, any>;
  isPending: boolean,
  isError: boolean
}

export const EarthquakeContext = createContext<EarthquakeContextValue | null>(
  null
);

export const useEarthquakeContext = () => {
  const ctx = useContext(EarthquakeContext);

  if (!ctx) {
    throw new Error(
      "useEarthquakeContext must be used within EarthquakeContextProvider"
    );
  }

  return ctx;
};

