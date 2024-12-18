import classNames from "classnames";
import styles from "./Sidebar.module.css";
import dayjs from "dayjs";
import { useMapContext } from "../context/MapContext";
import VectorSource from "ol/source/Vector";

function SidebarCard({ item }) {
  const { selectInteractionRef, mapRef } = useMapContext();

  function handleClick() {
    const mainLayer = mapRef.current
      ?.getAllLayers()
      .find((layer) => layer.get("id") === "main");

    const feature = (mainLayer?.getSource() as VectorSource).getFeatureById(
      item.id
    );

    if (!feature) return;

    selectInteractionRef.current?.getFeatures().clear();
    selectInteractionRef.current?.getFeatures().extend([feature]);
    selectInteractionRef.current?.dispatchEvent({
      type: "select",
      selected: [feature],
      deselected: [],
      payload: item,
    });

    const extent = feature.getGeometry()?.getExtent();

    if (extent) {
      mapRef.current?.getView().fit(extent, { size: mapRef.current.getSize(), maxZoom: 6 });
    }
  }

  return (
    <div
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
              {dayjs(item.properties.time).format("YYYY-MM-DDTHH:mm:ssZ[Z]")}
            </span>
            <span>{item.geometry.coordinates[2].toFixed(1)} KM</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SidebarCard;
