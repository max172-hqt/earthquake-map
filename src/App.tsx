import { useState } from "react";
import "./App.css";
import MainMap from "./components/MainMap";
import Layout from "./Layout";
import { SidebarContext } from "./context/SidebarContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import EarthquakeProvider from "./context/EarthquakeProvider";
import MapProvider from "./context/MapProvider";

// Create a client
const queryClient = new QueryClient();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <MapProvider>
        <EarthquakeProvider>
          <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
            <Layout>
              <MainMap />
            </Layout>
          </SidebarContext.Provider>
        </EarthquakeProvider>
      </MapProvider>
    </QueryClientProvider>
  );
}

export default App;
