import { useSidebarContext } from "../context/SidebarContext";
import styles from "./Navbar.module.css";
import { IconMenu2 } from "@tabler/icons-react";

function Navbar() {
  const { setIsSidebarOpen } = useSidebarContext();

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev)
  }

  return (
    <div id="navbar" className={styles.navbar}>
      <div className={styles.logo}>
        <IconMenu2 onClick={toggleSidebar}/>
        <h1>Earthquake Live</h1>
      </div>
    </div>
  );
}

export default Navbar;
