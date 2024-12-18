import { useQuery } from "@tanstack/react-query";
import { useState, type PropsWithChildren } from "react";

import { fetchEarthquakeData } from "../api/earthquake-data";
import { EarthquakeContext } from "./EarthquakeContext";

const EarthquakeProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [datasetName, setDatasetName] = useState('2.5_day.geojson');

  const { data, isPending, isError } = useQuery({
    queryKey: ["earthquakes", datasetName],
    queryFn: () => fetchEarthquakeData(datasetName),
  });

  return (
    <EarthquakeContext.Provider value={{ earthquakeData: data, isPending, isError, datasetName, setDatasetName }}>
      {children}
    </EarthquakeContext.Provider>
  );
};

export default EarthquakeProvider;
