import { Map } from "ol";
import type { Extent } from "ol/extent";
import Select from "ol/interaction/Select";
import { createContext, Dispatch, SetStateAction, useContext } from "react";

export interface MapContextValue {
  mapRef: React.MutableRefObject<Map | null>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  selectedEarthquake: {[key: string]: any} | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setSelectedEarthquake: Dispatch<SetStateAction<{[key: string]: any} | null>>
  selectInteractionRef: React.MutableRefObject<Select | null>;
  mapExtent: Extent | null,
  setMapExtent: Dispatch<SetStateAction<Extent | null>>
}

export const MapContext = createContext<MapContextValue | null>(null);

export const useMapContext = () => {
  const ctx = useContext(MapContext);

  if (!ctx) {
    throw new Error("useMapContext must be used within MapContextProvider");
  }

  return ctx;
};
