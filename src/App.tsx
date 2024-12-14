import { useState } from "react";
import "./App.css";
import MainMap from "./components/MainMap";
import Layout from "./Layout";
import { SidebarContext } from "./context/SidebarContext";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import EarthquakeProvider from "./context/EarthquakeProvider";

// Create a client
const queryClient = new QueryClient();

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <EarthquakeProvider>
        <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
          <Layout>
            <MainMap />
          </Layout>
        </SidebarContext.Provider>
      </EarthquakeProvider>
    </QueryClientProvider>
  );
}

export default App;
