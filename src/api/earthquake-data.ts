const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary"

export const fetchEarthquakeData = async (datasetName: string) => {
  const response = await fetch(`${url}/${datasetName}`);
  return response.json();
};
