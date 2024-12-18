import { useRef, useState, type PropsWithChildren } from "react";
import { MapContext } from "./MapContext";
import { Map } from "ol";
import Select from "ol/interaction/Select";

const MapProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const mapRef = useRef<Map | null>(null);

  const [selectedEarthquake, setSelectedEarthquake] = useState<{
    [key: string]: never;
  } | null>(null);

  const selectInteractionRef = useRef<Select | null>(null);

  return (
    <MapContext.Provider
      value={{ mapRef, selectedEarthquake, setSelectedEarthquake, selectInteractionRef }}
    >
      {children}
    </MapContext.Provider>
  );
};

export default MapProvider;
