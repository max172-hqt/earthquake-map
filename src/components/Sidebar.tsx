import styles from "./Sidebar.module.css";
import Button from "./ui/Button";

function Sidebar() {
  return (
    <div id="sidebar" className={styles.sidebar}>
      <h1>Sidebar</h1>
      <Button>Click</Button>
    </div>
  );
}

export default Sidebar;
