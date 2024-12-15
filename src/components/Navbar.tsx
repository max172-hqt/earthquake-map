// import { useEarthquakeContext } from "../context/EarthquakeContext";
import { useSidebarContext } from "../context/SidebarContext";
import styles from "./Navbar.module.css";
import { IconMenu2 } from "@tabler/icons-react";
import Button from "./ui/Button";

function Navbar() {
  const { setIsSidebarOpen } = useSidebarContext();
  // const { isPending } = useEarthquakeContext()

  function toggleSidebar() {
    setIsSidebarOpen((prev) => !prev);
  }

  return (
    <div id="navbar" className={styles.navbar}>
      <div className={styles.logo}>
        <Button variant="icon" onClick={toggleSidebar}>
          <IconMenu2 color="black" />
        </Button>
        <h1>Earthquake Live</h1>
      </div>
    </div>
  );
}

export default Navbar;
