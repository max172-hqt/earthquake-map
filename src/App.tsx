import { useState } from "react";
import "./App.css";
import MainMap from "./components/MainMap";
import Layout from "./Layout";
import { SidebarContext } from "./context/SidebarContext";
function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <SidebarContext.Provider value={{ isSidebarOpen, setIsSidebarOpen }}>
      <Layout>
        <MainMap />
      </Layout>
    </SidebarContext.Provider>
  );
}

export default App;
