import classNames from "classnames";
import { useSidebarContext } from "../context/SidebarContext";
import styles from "./Sidebar.module.css";
import { useEarthquakeContext } from "../context/EarthquakeContext";
import { useMemo } from "react";
import dayjs from "dayjs";
import SidebarCard from "./SidebarCard";

function Sidebar() {
  const { isSidebarOpen } = useSidebarContext();
  const { earthquakeData } = useEarthquakeContext();

  const items = useMemo(() => {
    if (!earthquakeData) return [];
    return earthquakeData.features;
  }, [earthquakeData]);

  const cssClasses = classNames(styles.sidebar, {
    [styles.sidebarOpen]: isSidebarOpen,
    [styles.sidebarClose]: !isSidebarOpen,
  });


  return (
    <div id="sidebar" className={cssClasses}>
      <div>Header</div>
      <div className={styles.listItem}>
        {items.map((item) => (
          <SidebarCard item={item} key={item.id}/>
         
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
