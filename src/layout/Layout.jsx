// OK
import styles from "./Layout.module.css";
import { Link, Outlet, useLoaderData, useNavigate } from "react-router-dom";
import { Fragment } from "react";
import SideBar from "./SideBar";

export default function Layout() {
  const navigate = useNavigate();
  const userInfor = useLoaderData();
  // Check if user has not logged in then navigate to "Login" page
  if (!userInfor.isLoggedIn) navigate("/admin/login");

  return (
    <Fragment>
      <div className={`${styles["layout-container"]} rows container-fluid`}>
        <div className={`${styles["header-part"]}`}>
          <div className={`${styles["admin"]}`}>
            <Link to={"/"}>Admin Page</Link>
          </div>
          <div className={`${styles["header"]}`}>
            <span>
              Hello: <span>{userInfor.lastName}</span>
            </span>
            <span>
              Your Role: <span>{userInfor.role}</span>
            </span>
          </div>
        </div>
        <div className={`${styles["body-part"]} d-flex align-items-stretch`}>
          <div className={`${styles["side-bar"]}`}>
            <SideBar userRole={userInfor.role} />
          </div>
          <div className={`${styles["outlet-content"]}`}>
            <Outlet />
          </div>
        </div>
      </div>
    </Fragment>
  );
}
