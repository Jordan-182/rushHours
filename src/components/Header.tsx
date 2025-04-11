import logo from "../assets/futuramaLogo.png";
import styles from "../styles/Header.module.css";

export const Header = () => {
  return (
    <header className={styles.globalHeader}>
      <section className={styles.headerTitle}>
        <h1>Welcome to the World of</h1>
        <img src={logo} alt="Futurama Logo" className={styles.logo} />
      </section>
    </header>
  );
};
