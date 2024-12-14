import { useQuery } from "@tanstack/react-query";
import type { PropsWithChildren } from "react";

import { fetchEarthquakeData } from "../api/earthquake-data";
import { EarthquakeContext } from "./EarthquakeContext";

const EarthquakeProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ["earthquakes"],
    queryFn: fetchEarthquakeData,
  });

  return (
    <EarthquakeContext.Provider value={{ earthquakeData: data, isPending, isError }}>
      {children}
    </EarthquakeContext.Provider>
  );
};

export default EarthquakeProvider;
