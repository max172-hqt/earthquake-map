import classNames from "classnames";
import { useSidebarContext } from "../context/SidebarContext";
import styles from "./Sidebar.module.css";
import Button from "./ui/Button";

function Sidebar() {
  const { isSidebarOpen } = useSidebarContext();

  const cssClasses = classNames(styles.sidebar, {
    [styles.sidebarOpen]: isSidebarOpen,
    [styles.sidebarClose]: !isSidebarOpen,
  })

  return (
    <div id="sidebar" className={cssClasses}>
      <h1>Sidebar</h1>
      <Button variant="default" size="default">
        Click
      </Button>
    </div>
  );
}

export default Sidebar;
