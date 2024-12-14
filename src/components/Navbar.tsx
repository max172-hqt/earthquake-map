import styles from "./Navbar.module.css";
import { IconMenu2 } from '@tabler/icons-react'

function Navbar() {
  return (
    <div id="navbar" className={styles.navbar}>
      <div className={styles.logo}>
        <IconMenu2 />
        <h1>Earthquake Live</h1>
      </div>
    </div>
  );
}

export default Navbar;
