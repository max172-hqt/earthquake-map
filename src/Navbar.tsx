import styles from "./Navbar.module.css";

function Navbar() {
  return (
    <div id="navbar" className={styles.navbar}>
      <div className={styles.logo}>
        <h1>Earthquake Live</h1>
      </div>
    </div>
  );
}

export default Navbar;
