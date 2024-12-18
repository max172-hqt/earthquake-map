import { Map } from "ol";
import Select from "ol/interaction/Select";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface MapContextValue {
  mapRef: React.MutableRefObject<Map | null>;
  selectedEarthquake: {[key: string]: never} | null;
  setSelectedEarthquake: Dispatch<SetStateAction<{[key: string]: never} | null>>
  selectInteractionRef: React.MutableRefObject<Select | null>;
}

export const MapContext = createContext<MapContextValue | null>(null);

export const useMapContext = () => {
  const ctx = useContext(MapContext);

  if (!ctx) {
    throw new Error("useMapContext must be used within MapContextProvider");
  }

  return ctx;
};
