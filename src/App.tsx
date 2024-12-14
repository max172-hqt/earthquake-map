import { Map, View } from "ol";
import "./App.css";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import Layout from "./Layout";

const EARTHQUAKE_VECTOR_LAYER_Z_INDEX = 10;

function App() {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [earthquakeData, setEarthquakeData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"
      );
      const data = await response.json();
      setEarthquakeData(data);
    }

    fetchData();
  }, []);

  // Initialize the map
  useEffect(() => {
    if (containerRef.current === null) {
      return;
    }

    mapRef.current = new Map();

    const baseOSM = new OSM();
    const layer = new TileLayer({ source: baseOSM });
    const view = new View({
      center: [0, 0],
      zoom: 0,
    });

    mapRef.current.setTarget(containerRef.current);
    mapRef.current.setLayers([layer]);
    mapRef.current.setView(view);

    return () => mapRef.current?.setTarget(undefined);
  }, []);

  useEffect(() => {
    if (mapRef.current === null || earthquakeData === null) {
      return;
    }

    const layers = mapRef.current.getLayers().getArray();
    let earthquakeLayer = layers.find(
      (layer) => layer.get("id") === "main"
    ) as VectorLayer;

    if (!earthquakeLayer) {
      earthquakeLayer = new VectorLayer({
        zIndex: EARTHQUAKE_VECTOR_LAYER_Z_INDEX,
      });
      earthquakeLayer.set("id", "main");
      mapRef.current.addLayer(earthquakeLayer);
    }

    const source = new VectorSource({
      features: new GeoJSON().readFeatures(earthquakeData, {
        // different projections between the data and the map view
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      }),
    });

    earthquakeLayer.setSource(source);
  }, [earthquakeData]);

  return (
    <Layout>
      <div id="map" ref={containerRef}></div>
    </Layout>
  );
}

export default App;
