import styles from "./MenuLink.module.css";
import { Link, useLocation } from "react-router-dom";

export default function MenuLink({ children, to }) {
  const location = useLocation();
  let path = location.pathname;

  return (
    <Link
      className={`
            ${styles.link} 
            ${path === to ? styles.linkDestacado : ""}
        `}
      to={to}
    >
      {children}
    </Link>
  );
}
