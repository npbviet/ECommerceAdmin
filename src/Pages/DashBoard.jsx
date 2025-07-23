import { Link, useLoaderData } from "react-router-dom";
import styles from "./DashBoard.module.css";

export default function DashBoard() {
  const { users, orders } = useLoaderData();
  const currentDate = new Date().setHours(0, 0, 0, 0);

  const moneyNumber = (num) => {
    return Number(num).toLocaleString(`de-DE`);
  };
  // Get an array of "updatedDate"
  const completedDate = orders.map((item) => new Date(item.updatedAt));
  const minCompletedDate = Math.min(...completedDate);

  // Get total of day from "minCompletedDate" to "currentDate"
  const totalDay = (currentDate - minCompletedDate) / (1000 * 60 * 60 * 24);

  // Get total month: from "minCompletedDate" to "currentDate"
  const totalMonth = totalDay / 30 < 1 ? 1 : totalDay / 30;

  const quantityUser = users.filter((user) => user.role === "customer").length;

  const quantityOrder = orders.length;
  const earnings = orders.reduce((total, item) => {
    return total + item.totalAmount;
  }, 0);

  // Get average revenue per month from "minCompletedDate" to "currentDate"
  const balance = earnings / totalMonth;

  // Define list of orders element: "orderListEL"
  const orderListEL = (
    <div>
      {/* <!-- Header --> */}
      <div className={`${styles["header"]}  ${styles["custom-border"]}`}>
        <div className={`${styles["user-ID"]}`}>ID User</div>
        <div className={`${styles["user-name"]}`}>Name</div>
        <div className={`${styles["phone-number"]}`}>Phone</div>
        <div className={`${styles["address"]}`}>Address</div>
        <div className={`${styles["total-amount"]}`}>Total</div>
        <div className={`${styles["delivery"]}`}>Delivery</div>
        <div className={`${styles["order-status"]}`}>Status</div>
        <div className={`${styles["detail-order"]}`}>View</div>
      </div>
      <div className={styles["container-content"]}>
        {orders.map((item, index) => (
          /* <!-- Content --> */
          <div key={index} className={`${styles["content"]}  `}>
            <div className={`${styles["user-ID"]}`}>{item.user.userID}</div>
            <div className={`${styles["user-name"]}`}>{item.user.fullName}</div>
            <div className={`${styles["phone-number"]}`}>{item.user.phone}</div>
            <div className={`${styles["address"]}`}>{item.user.address}</div>
            <div className={`${styles["total-amount"]}`}>
              {moneyNumber(item.totalAmount)}
            </div>
            <div className={`${styles["delivery"]}`}>
              {item.status === "completed"
                ? "Đã vận chuyển"
                : "Chưa vận chuyển"}
            </div>
            <div className={`${styles["order-status"]}`}>
              {item.status === "completed"
                ? "Đã thanh toán"
                : "Chưa thanh toán"}
            </div>
            <div className={`${styles["detail-order"]}`}>
              <Link
                className={styles["view-btn"]}
                to={"/order-detail"}
                state={{ orderID: item._id }}
              >
                View
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className={`${styles["dash-board-container"]} `}>
      {/* Section-1: General Information of Business */}
      <div className={`${styles["top-infor"]} d-flex`}>
        {/* CLIENTS */}
        <div className={`${styles["top-content"]} border`}>
          <div>
            <p className={styles["value-container"]}>
              {quantityUser.toLocaleString("vi-VN")}
            </p>
            <p className={styles["sub-title"]}>Clients</p>
          </div>
          <div className={styles["container-icon"]}>
            <i className="bi bi-person-plus" />
          </div>
        </div>

        {/* ERNINGS OF MONTH */}
        <div className={`${styles["top-content"]} border`}>
          <div>
            <p className={styles["value-container"]}>
              {balance.toLocaleString("vi-VN")}
              <span className={styles["vnd-unit"]}>VND</span>
            </p>
            <p className={styles["sub-title"]}>Earnings of Month</p>
          </div>
          <div className={styles["container-icon"]}>
            <i className="bi bi-currency-dollar" />
          </div>
        </div>

        <div className={`${styles["top-content"]} border`}>
          <div>
            <p className={styles["value-container"]}>
              {quantityOrder.toLocaleString("vi-VN")}
            </p>
            <p className={styles["sub-title"]}>New Order</p>
          </div>
          <div className={styles["container-icon"]}>
            <i className="bi bi-file-earmark-plus" />
          </div>
        </div>
      </div>

      {/* Section-2: List of transactions */}
      <div className={`${styles["list-transaction"]}`}>
        {orders?.length === 0 && (
          <div className={`${styles["text-infor"]} ${styles["no-order"]}`}>
            Not found data of orders!
          </div>
        )}

        {orders?.length > 0 && (
          <div>
            <p className={`${styles["title-list-orders"]} `}>History</p>
            {orderListEL}
          </div>
        )}
      </div>
    </div>
  );
}
