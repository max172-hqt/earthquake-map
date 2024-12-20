// import { useEarthquakeContext } from "../context/EarthquakeContext";
import { useSidebarContext } from "../context/SidebarContext";
import styles from "./Navbar.module.css";
import { IconMenu2, IconRefresh } from "@tabler/icons-react";
import Button from "./ui/Button";
import { useEarthquakeContext } from "../context/EarthquakeContext";

function Navbar() {
  const { setIsSidebarOpen } = useSidebarContext();
  const { refetch } = useEarthquakeContext();

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  return (
    <div id="navbar" className={styles.navbar}>
      <div className={styles.logo}>
        <Button variant="icon" onClick={toggleSidebar}>
          <IconMenu2 color="black" />
        </Button>
        <Button variant="icon" onClick={refetch}>
          <IconRefresh color="black" />
        </Button>
      </div>
    </div>
  );
}

export default Navbar;
