import { useRef, useState, type PropsWithChildren } from "react";
import { MapContext } from "./MapContext";
import { Map } from "ol";
import Select from "ol/interaction/Select";
import { Extent } from "ol/extent";

const MapProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const mapRef = useRef<Map | null>(null);
  const [mapExtent, setMapExtent] = useState<Extent | null>(null);

  const [selectedEarthquake, setSelectedEarthquake] = useState<{
    [key: string]: never;
  } | null>(null);

  const selectInteractionRef = useRef<Select | null>(null);

  return (
    <MapContext.Provider
      value={{
        mapRef,
        selectedEarthquake,
        setSelectedEarthquake,
        selectInteractionRef,
        mapExtent,
        setMapExtent,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
