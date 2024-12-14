import classNames from "classnames";
import { useSidebarContext } from "../context/SidebarContext";
import styles from "./Sidebar.module.css";
import Button from "./ui/Button";
import { useEarthquakeContext } from "../context/EarthquakeContext";
import { useMemo } from "react";

function Sidebar() {
  const { isSidebarOpen } = useSidebarContext();
  const { earthquakeData } = useEarthquakeContext();

  const items = useMemo(() => {
    if (!earthquakeData) return []
    return earthquakeData.features;
  }, [earthquakeData]);

  const cssClasses = classNames(styles.sidebar, {
    [styles.sidebarOpen]: isSidebarOpen,
    [styles.sidebarClose]: !isSidebarOpen,
  });

  return (
    <div id="sidebar" className={cssClasses}>
      <ul>
        {items.map((item) => (
          <li key={item.id}>{item.properties.place}</li>
        ))}
      </ul>
      <Button variant="default" size="default">
        Click
      </Button>
    </div>
  );
}

export default Sidebar;
