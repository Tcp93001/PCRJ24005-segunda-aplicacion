import { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../UI/Button/Button";
import styles from "./Navigation.module.css";
import AuthContext from "../../context/AuthContext";

function Navigation() {
  const { isLoggedIn, onLogOut } = useContext(AuthContext)

  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <Link to='/'>Public</Link>
        </li>
        <li>
          <Link to='/gallery'>Galería</Link>
        </li>
        <li>
          <Link to='/home'>Home</Link>
        </li>
        <li>
          {isLoggedIn ? (
            <Button color='secondary' onClick={onLogOut}>Logout</Button>
          ) : (
            <Link to='/login'>Login</Link>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
