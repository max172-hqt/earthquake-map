import classNames from "classnames";
import { useSidebarContext } from "../context/SidebarContext";
import styles from "./Sidebar.module.css";
import { useEarthquakeContext } from "../context/EarthquakeContext";
import SidebarCard from "./SidebarCard";
import Button from "./ui/Button";
import { IconX } from "@tabler/icons-react";
import { useState } from "react";

function Sidebar() {
  const { isSidebarOpen, setIsSidebarOpen } = useSidebarContext();
  const {
    setDatasetName,
    datasetName,
    setSorting,
    sorting,
    sortedData,
    showOnMapOnly,
    setShowOnMapOnly,
    totalResults,
  } = useEarthquakeContext();

  const [title, setTitle] = useState("1 Day, Magnitude 2.5+");

  const cssClasses = classNames(styles.sidebar, {
    [styles.sidebarOpen]: isSidebarOpen,
    [styles.sidebarClose]: !isSidebarOpen,
  });

  return (
    <div id="sidebar" className={cssClasses}>
      <div className={styles.topNav}>
        <h1>{title}</h1>
        <Button variant="icon" onClick={() => setIsSidebarOpen(false)}>
          <IconX color="black" />
        </Button>
      </div>
      <div className={styles.header}>
        <div className={styles.headerSelects}>
          <div>
            <label htmlFor="dataset">Dataset</label>
            <select
              name="dataset"
              id="dataset"
              className={styles.select}
              value={datasetName}
              onChange={(e) => {
                setDatasetName(e.target.value);
                setTitle(e.target.options[e.target.selectedIndex].innerHTML)
              }}
            >
              <option value="2.5_day.geojson">1 Day, Magnitude 2.5+</option>
              <option value="all_day.geojson">1 Day, All Magnitude</option>
              <option value="4.5_week.geojson">7 Days, Magnitude 4.5+</option>
              <option value="2.5_week.geojson">7 Days, Magnitude 2.5+</option>
              <option value="all_week.geojson">7 Days, All Magnitude</option>
              <option value="4.5_month.geojson">30 Days, Magnitude 4.5+</option>
              {/* <option value="2.5_month.geojson">30 Days, Magnitude 2.5+</option>
              <option value="all_month.geojson">30 Days, All Magnitude</option> */}
              <option value="significant_month.geojson">
                30 Days, Significant Worldwide
              </option>
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
        <div className={styles.checkbox}>
          <label htmlFor="onMapOnly">
            <input
              type="checkbox"
              id="onMapOnly"
              checked={showOnMapOnly}
              onChange={(e) => {
                setShowOnMapOnly(e.target.checked);
              }}
            />
            Show only earthquakes on the map
          </label>
        </div>
        <div>
          Showing {sortedData.length} out of {totalResults} results
        </div>
      </div>
      <div className={styles.listItem}>
        {sortedData.map(
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          (item: any) => (
          <SidebarCard item={item} key={item.id} id={item.id} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
