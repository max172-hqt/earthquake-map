import { Map, View } from "ol";
import { OSM } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { useEffect, useRef } from "react";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { useEarthquakeContext } from "../context/EarthquakeContext";

const EARTHQUAKE_VECTOR_LAYER_Z_INDEX = 10;

function MainMap() {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const { earthquakeData } = useEarthquakeContext()

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
    if (mapRef.current === null || !earthquakeData) {
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
    <div id="map" ref={containerRef}></div>
  )
}

export default MainMap;
