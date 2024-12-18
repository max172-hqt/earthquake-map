import classNames from "classnames";
import { useSidebarContext } from "../context/SidebarContext";
import styles from "./Sidebar.module.css";
import { useEarthquakeContext } from "../context/EarthquakeContext";
import { useMemo } from "react";
import SidebarCard from "./SidebarCard";

function Sidebar() {
  const { isSidebarOpen } = useSidebarContext();
  const { earthquakeData, setDatasetName, datasetName } =
    useEarthquakeContext();

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
      <div className={styles.header}>
        <label htmlFor="dataset">Dataset</label>
        <select
          name="dataset"
          id="dataset"
          className={styles.select}
          value={datasetName}
          onChange={(e) => setDatasetName(e.target.value)}
        >
          <option value="2.5_day.geojson">1 Day, Magnitude 2.5+ U.S.</option>
          <option value="all_day.geojson">1 Day, All Magnitude U.S.</option>
        </select>
      </div>
      <div className={styles.listItem}>
        {items.map((item) => (
          <SidebarCard item={item} key={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
