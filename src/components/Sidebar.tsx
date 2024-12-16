import classNames from "classnames";
import { useSidebarContext } from "../context/SidebarContext";
import styles from "./Sidebar.module.css";
import { useEarthquakeContext } from "../context/EarthquakeContext";
import { useMemo } from "react";
import dayjs from "dayjs";

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

  function handleClick() {
    console.log("hello");
  }

  return (
    <div id="sidebar" className={cssClasses}>
      <div>Header</div>
      <div className={styles.listItem}>
        {items.map((item) => (
          <div
            key={item.id}
            className={classNames(styles.cardContainer, {
              [styles.cardContainerDanger]: item.properties.mag >= 4.5,
            })}
          >
            <button onClick={handleClick}></button>
            <div className={styles.content}>
              <div
                className={classNames(styles.mag, {
                  [styles.danger]: item.properties.mag >= 4.5,
                })}
              >
                {item.properties.mag}
              </div>
              <div className={styles.info}>
                <h3>{item.properties.title}</h3>
                <div className={styles.subinfo}>
                  <span>
                    {dayjs(item.properties.time).format(
                      "YYYY-MM-DDTHH:mm:ssZ[Z]"
                    )}
                  </span>
                  <span>{item.geometry.coordinates[2].toFixed(1)} KM</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
