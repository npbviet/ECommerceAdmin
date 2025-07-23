import styles from "./SideBar.module.css";
import { Fragment } from "react";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../api/authApi";

export default function SideBar({ userRole }) {
  const navigate = useNavigate();
  async function logoutHandler() {
    const confirmed = window.confirm("Do you really want to logout?");
    if (!confirmed) return;

    try {
      await logoutUser();
      navigate("/admin/login");
    } catch (error) {
      console.error("Logout error:", error.message);
      alert("Failed to logout. Please try again.");
    }
  }

  return (
    <Fragment>
      <div className={styles["sidebar-container"]}>
        <div className={`${styles["sub-container"]} d-flex flex-column`}>
          <span className={styles["title"]}>MAIN</span>
          {/* Dash-Board */}
          <div className={styles["items-list"]}>
            <img src="/images/dash-board.jpg" />
            <Link to="/">Dash Board</Link>
          </div>

          {/* Live chat */}
          <div className={styles["items-list"]}>
            <i className="bi bi-chat-left-text" />
            <Link to="chat">Live chat</Link>
          </div>
        </div>

        {userRole === "admin" && (
          <div className={`${styles["sub-container"]} d-flex flex-column`}>
            <span className={styles["title"]}>LISTS</span>

            {/* Products */}
            <div className={styles["items-list"]}>
              <img src="/images/room.jpg" />
              <Link to="products">Products</Link>
            </div>
          </div>
        )}

        <div className={`${styles["sub-container"]} d-flex flex-column`}>
          <span className={styles["title"]}>USERS</span>
          <div className={styles["items-list"]}>
            <img src="/images/logout.jpg" />
            <button className={styles["logout-btn"]} onClick={logoutHandler}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
