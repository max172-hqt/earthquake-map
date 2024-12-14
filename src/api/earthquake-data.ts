const url = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"

export const fetchEarthquakeData = async () => {
  const response = await fetch(url);
  return response.json();
};
