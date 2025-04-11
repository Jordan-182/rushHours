import logo from "../assets/futuramaLogo.png";
import styles from "../styles/Header.module.css";

export const Header = () => {
  return (
    <header className={styles.globalHeader}>
      <img src={logo} alt="Futurama Logo" className={styles.logo} />
    </header>
  );
};
