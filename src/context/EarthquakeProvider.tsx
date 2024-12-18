import { useQuery } from "@tanstack/react-query";
import { useMemo, useState, type PropsWithChildren } from "react";

import { fetchEarthquakeData } from "../api/earthquake-data";
import { EarthquakeContext } from "./EarthquakeContext";
import _ from "lodash";

const EarthquakeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [datasetName, setDatasetName] = useState("2.5_day.geojson");
  const [sorting, setSorting] = useState("newest");

  const { data, isPending, isError } = useQuery({
    queryKey: ["earthquakes", datasetName],
    queryFn: () => fetchEarthquakeData(datasetName),
  });

  const sortedData = useMemo(() => {
    if (!data) return []

    let sortedFeatures = []

    if (sorting === "newest") {
      sortedFeatures = _.orderBy(data.features, "properties.time", "desc");
    } else if (sorting === "oldest") {
      sortedFeatures = _.orderBy(data.features, "properties.time", "asc");
    } else if (sorting === "largest_mag") {
      sortedFeatures = _.orderBy(data.features, "properties.mag", "desc");
    } else if (sorting === "smallest_mag") {
      sortedFeatures = _.orderBy(data.features, "properties.mag", "asc");
    }

    console.log(sortedFeatures)

    return sortedFeatures;
  }, [data, sorting]);

  return (
    <EarthquakeContext.Provider
      value={{
        earthquakeData: data,
        isPending,
        isError,
        datasetName,
        setDatasetName,
        sortedData,
        sorting,
        setSorting,
      }}
    >
      {children}
    </EarthquakeContext.Provider>
  );
};

export default EarthquakeProvider;
