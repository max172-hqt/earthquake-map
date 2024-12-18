import classNames from "classnames";
import { useSidebarContext } from "../context/SidebarContext";
import styles from "./Sidebar.module.css";
import { useEarthquakeContext } from "../context/EarthquakeContext";
import SidebarCard from "./SidebarCard";

function Sidebar() {
  const { isSidebarOpen } = useSidebarContext();
  const { setDatasetName, datasetName, setSorting, sorting, sortedData } =
    useEarthquakeContext();

  const cssClasses = classNames(styles.sidebar, {
    [styles.sidebarOpen]: isSidebarOpen,
    [styles.sidebarClose]: !isSidebarOpen,
  });

  return (
    <div id="sidebar" className={cssClasses}>
      <div className={styles.header}>
        <div>
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
        <div>
          <label htmlFor="sorting">Sort by</label>
          <select
            name="sorting"
            id="sorting"
            className={styles.select}
            value={sorting}
            onChange={(e) => setSorting(e.target.value)}
          >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="largest_mag">Largest Magnitude</option>
            <option value="smallest_mag">Smallest Magnitude</option>
          </select>
        </div>
      </div>
      <div className={styles.listItem}>
        {sortedData.map((item) => (
          <SidebarCard item={item} key={item.id} id={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
