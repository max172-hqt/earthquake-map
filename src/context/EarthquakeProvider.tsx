import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState, type PropsWithChildren } from "react";

import { fetchEarthquakeData } from "../api/earthquake-data";
import { EarthquakeContext } from "./EarthquakeContext";
import _ from "lodash";
import { containsCoordinate, Extent } from "ol/extent";
import { useMapContext } from "./MapContext";

const EarthquakeProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const { mapExtent } = useMapContext();

  const [datasetName, setDatasetName] = useState("2.5_day.geojson");
  const [sorting, setSorting] = useState("newest");
  const [showOnMapOnly, setShowOnMapOnly] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [sortedData, setSortedData] = useState<any>([]);

  const { data, isPending, isError } = useQuery({
    queryKey: ["earthquakes", datasetName],
    queryFn: () => fetchEarthquakeData(datasetName),
  });

  const totalResults = useMemo(() => data?.metadata?.count || 0, [data]);

  useEffect(() => {
    if (!data) return;

    let sortedFeatures = data.features;

    if (showOnMapOnly && mapExtent) {
      sortedFeatures = _.filter(sortedFeatures, (feature) =>
        containsCoordinate(mapExtent, feature.geometry.coordinates)
      );
    }

    if (sorting === "newest") {
      sortedFeatures = _.orderBy(sortedFeatures, "properties.time", "desc");
    } else if (sorting === "oldest") {
      sortedFeatures = _.orderBy(sortedFeatures, "properties.time", "asc");
    } else if (sorting === "largest_mag") {
      sortedFeatures = _.orderBy(sortedFeatures, "properties.mag", "desc");
    } else if (sorting === "smallest_mag") {
      sortedFeatures = _.orderBy(sortedFeatures, "properties.mag", "asc");
    }

    setSortedData(sortedFeatures);
  }, [data, sorting, showOnMapOnly, mapExtent]);

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
        showOnMapOnly,
        setShowOnMapOnly,
        totalResults,
      }}
    >
      {children}
    </EarthquakeContext.Provider>
  );
};

export default EarthquakeProvider;
