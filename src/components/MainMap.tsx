import { Map, Overlay, VectorTile, View } from "ol";
import { OSM, Vector } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import GeoJSON from "ol/format/GeoJSON";
import { useEarthquakeContext } from "../context/EarthquakeContext";
import { Style, Fill, Stroke, Circle } from "ol/style";
import Select from "ol/interaction/Select";
import { FeatureLike } from "ol/Feature";
import { click } from "ol/events/condition.js";
import { Point } from "ol/geom";
import InfoPopup from "./InfoPopup";
import EsriJSON from "ol/format/EsriJSON";
import { transform } from "ol/proj";

const EARTHQUAKE_VECTOR_LAYER_Z_INDEX = 10;

const serviceUrl =
  "https://services-eu1.arcgis.com/NPIbx47lsIiu2pqz/ArcGIS/rest/services/" +
  "Neptune_Coastline_Campaign_Open_Data_Land_Use_2014/FeatureServer/";

const fill = new Fill({
  color: "#ea580c",
});

const stroke = new Stroke({
  color: "#666",
  width: 1.25,
});

const selectedFill = new Fill({
  color: "#9a3412",
});

const defaultStyle = new Style({
  image: new Circle({
    fill: fill,
    stroke: stroke,
    radius: 5,
  }),
});

function styleFunction(feature: FeatureLike) {
  const style = defaultStyle.clone();
  const mag = feature.getProperties().mag;
  const circle = style.getImage() as Circle;
  circle.setRadius(mag * 2);
  return style;
}

function selectedStyleFunction(feature: FeatureLike) {
  const style = defaultStyle.clone();
  const mag = feature.getProperties().mag;
  const circle = style.getImage() as Circle;
  circle.setRadius(mag * 2);
  circle.setFill(selectedFill);
  return style;
}

function MainMap() {
  const mapRef = useRef<Map | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const [popupPosition, setPopupPosition] = useState<number[] | null>(null);
  const [selectedEarthquake, setSelectedEarthquake] = useState(null);
  const { earthquakeData } = useEarthquakeContext();

  const popupObjectRef = useRef<Overlay | null>(null);
  const selectInteractionRef = useRef<Select | null>(null);

  // Initialize the map
  useEffect(() => {
    if (containerRef.current === null || popupRef.current === null) {
      return;
    }

    mapRef.current = new Map();

    const baseOSM = new OSM();
    const layer = new TileLayer({ source: baseOSM });
    const tectonicLayer = new VectorLayer({
      source: new Vector({
        url: "https://services.arcgis.com/As5CFN3ThbQpy8Ph/arcgis/rest/services/EarthTectonicPlates12/FeatureServer/0/query/?f=json&where=1%3D1",
        format: new EsriJSON(),
      }),
    });
    const view = new View({
      center: [0, 0],
      zoom: 0,
    });

    selectInteractionRef.current = new Select({
      condition: click,
      style: selectedStyleFunction,
    });

    popupObjectRef.current = new Overlay({
      element: popupRef.current,
      autoPan: true,
    });

    selectInteractionRef.current.on("select", (event) => {
      if (!popupObjectRef.current || !mapRef.current) return;
      popupObjectRef.current.setPosition(undefined);

      const features = event.selected;

      if (features.length === 0 || !popupRef.current) {
        popupObjectRef.current.setPosition(undefined);
        return;
      }

      const feature = features[0];
      const properties = feature.getProperties();

      if (properties.type !== 'earthquake') {
        return;
      }

      setSelectedEarthquake(properties);

      const point = feature.getGeometry() as Point;
      const coordinates = point.getCoordinates();
      setPopupPosition(coordinates);

      popupObjectRef.current.setPosition(coordinates);
      // mapRef.current.getView().animate({
      //   center: coordinates,
      //   duration: 200, // Animation duration in milliseconds
      // });
    });

    mapRef.current.setTarget(containerRef.current);
    mapRef.current.setLayers([layer, tectonicLayer]);
    mapRef.current.setView(view);

    mapRef.current.addInteraction(selectInteractionRef.current);
    mapRef.current.addOverlay(popupObjectRef.current);

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
    earthquakeLayer.setStyle(styleFunction);
  }, [earthquakeData]);

  function closePopup() {
    popupObjectRef.current?.setPosition(undefined);
    selectInteractionRef.current?.getFeatures().clear();
  }

  return (
    <>
      <div id="popup" ref={popupRef}>
        {selectedEarthquake && (
          <InfoPopup data={selectedEarthquake} onClose={closePopup} />
        )}
      </div>
      <div id="map" ref={containerRef}></div>
    </>
  );
}

export default MainMap;
