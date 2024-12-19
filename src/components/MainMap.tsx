import { Map, Overlay, View } from "ol";
import { OSM, Vector } from "ol/source";
import TileLayer from "ol/layer/Tile";
import { useCallback, useEffect, useRef } from "react";
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
import { useMapContext } from "../context/MapContext";
import { transformExtent } from "ol/proj";

const EARTHQUAKE_VECTOR_LAYER_Z_INDEX = 10;

const tectonicPlateLayerUrl =
  "https://services.arcgis.com/As5CFN3ThbQpy8Ph/arcgis/rest/services/EarthTectonicPlates12/FeatureServer/0/query/?f=json&where=1%3D1";

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
  const radius = mag > 0 ? mag * 2 : 1;
  circle.setRadius(radius);
  return style;
}

function selectedStyleFunction(feature: FeatureLike) {
  const style = defaultStyle.clone();
  const mag = feature.getProperties().mag;
  const circle = style.getImage() as Circle;
  const radius = mag > 0 ? mag * 2 : 1;
  circle.setRadius(radius);
  circle.setFill(selectedFill);
  return style;
}

function MainMap() {
  const {
    mapRef,
    selectedEarthquake,
    setSelectedEarthquake,
    selectInteractionRef,
    setMapExtent,
  } = useMapContext();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const popupRef = useRef<HTMLDivElement | null>(null);
  const { earthquakeData, showOnMapOnly } = useEarthquakeContext();

  const popupObjectRef = useRef<Overlay | null>(null);

  const getMapExtent = useCallback(() => {
    if (!mapRef.current) return null;

    const extent = mapRef.current
      .getView()
      .calculateExtent(mapRef.current.getSize());
    return transformExtent(extent, "EPSG:3857", "EPSG:4326");
  }, [mapRef]);

  // Initialize the map
  useEffect(() => {
    if (containerRef.current === null || popupRef.current === null) {
      return;
    }

    mapRef.current = new Map();

    const baseOSM = new OSM();

    const baseLayer = new TileLayer({ source: baseOSM });

    const tectonicLayer = new VectorLayer({
      source: new Vector({
        url: tectonicPlateLayerUrl,
        format: new EsriJSON(),
      }),
    });

    const earthquakeLayer = new VectorLayer({
      zIndex: EARTHQUAKE_VECTOR_LAYER_Z_INDEX,
    });
    earthquakeLayer.set("id", "main");

    const view = new View({
      center: [0, 0],
      zoom: 0,
    });

    selectInteractionRef.current = new Select({
      condition: click,
      style: selectedStyleFunction,
      layers: [earthquakeLayer],
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
        setSelectedEarthquake(null);
        return;
      }

      const feature = features[0];
      const properties = feature.getProperties();

      if (properties.type !== "earthquake") {
        return;
      }

      setSelectedEarthquake(properties);

      const point = feature.getGeometry() as Point;
      const coordinates = point.getCoordinates();
      popupObjectRef.current.setPosition(coordinates);
    });

    mapRef.current.setTarget(containerRef.current);
    mapRef.current.setLayers([baseLayer, tectonicLayer, earthquakeLayer]);
    mapRef.current.setView(view);

    mapRef.current.addInteraction(selectInteractionRef.current);
    mapRef.current.addOverlay(popupObjectRef.current);

    return () => mapRef.current?.setTarget(undefined);
  }, [mapRef, selectInteractionRef, setSelectedEarthquake]);

  useEffect(() => {
    if (mapRef.current === null || !earthquakeData) {
      return;
    }

    const layers = mapRef.current.getLayers().getArray();

    const earthquakeLayer = layers.find(
      (layer) => layer.get("id") === "main"
    ) as VectorLayer;

    if (!earthquakeLayer) return;

    const source = new VectorSource({
      features: new GeoJSON().readFeatures(earthquakeData, {
        // different projections between the data and the map view
        dataProjection: "EPSG:4326",
        featureProjection: "EPSG:3857",
      }),
    });

    earthquakeLayer.setSource(source);
    earthquakeLayer.setStyle(styleFunction);
  }, [earthquakeData, mapRef]);

  useEffect(() => {
    if (mapRef.current === null) {
      return;
    }

    function handleMoveEnd() {
      const extent = getMapExtent();
      setMapExtent(extent);
    }

    if (showOnMapOnly) {
      handleMoveEnd();
      mapRef.current.on("moveend", handleMoveEnd);
    } else {
      mapRef.current.un("moveend", handleMoveEnd);
    }
  }, [mapRef, setMapExtent, showOnMapOnly, getMapExtent]);

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
