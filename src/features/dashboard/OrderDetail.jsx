import styles from "./OrderDetail.module.css";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { getOrderById } from "../../api/orderApi";

export default function OrderDetail() {
  // Get "orderID" send by <Link> View </Link> in "Order.js" component
  const location = useLocation();
  const orderID = location.state?.orderID;

  // Define "orderOfUser" state to store order data of current user
  const [orderDetail, setOrderDetail] = useState(null);

  // This "useEffect()" hook to get order data of current user when load this page
  useEffect(() => {
    getOrderById(orderID).then((data) => {
      if (data) {
        setOrderDetail(data);
      }
    });
  }, []);

  const moneyNumber = (num) => {
    return Number(num).toLocaleString(`de-DE`);
  };

  return (
    <div className="d-grid gap-3">
      {/* BANNER */}
      <section>
        <div
          className={`${styles.banner} d-flex justify-content-between align-items-center fst-italic mb-5`}
        >
          <h1>ORDER DETAILS</h1>
          <h5>ORDER DETAILS</h5>
        </div>
      </section>

      {/* INSTRUCTION FOR GET DETAIL OF ORDER */}
      {!orderID && (
        <div className={styles["instruction"]}>
          <p className={styles["title"]}>
            To get details of order, please follow these steps:
          </p>
          <ul className={styles["instruction-content"]}>
            <li>
              Visit the Dash Board page by clicked to "Dash Board" in Sidebar
            </li>
            <li>
              Select a certain order in list then click to "View" button of this
              one
            </li>
          </ul>
        </div>
      )}

      {orderID && (
        <div>
          {orderDetail && (
            <div>
              {/* USER INFORMATION */}
              <section>
                <div className={styles["user-infor"]}>
                  <p>INFORAMTION ORDER</p>
                  <ul className={styles["content-infor"]}>
                    <li>ID User: {orderDetail.user.userID}</li>
                    <li>Full Name: {orderDetail.user.fullName}</li>
                    <li>Phone: {orderDetail.user.phone}</li>
                    <li>Address: {orderDetail.user.address}</li>
                    <li>Total: {moneyNumber(orderDetail.totalAmount)} VND</li>
                  </ul>
                </div>
              </section>

              {/* ORDER LIST */}
              <section>
                <div className={styles["order-list-container"]}>
                  {/* Header */}
                  <div className={`${styles["header"]} d-flex`}>
                    <div className={`${styles["productID"]}`}>ID PRODUCT</div>
                    <div className={`${styles["image"]}`}>IMAGE</div>
                    <div className={`${styles["name"]}`}>NAME</div>
                    <div className={`${styles["price"]}`}>PRICE</div>
                    <div className={`${styles["detail"]}`}> COUNT</div>
                  </div>

                  {/* Body */}
                  <div className={`${styles["container-content"]} border`}>
                    {orderDetail.products.map((item, index) => (
                      /* <!-- Content --> */
                      <div
                        key={index}
                        className={`${styles["content"]}  d-flex`}
                      >
                        <div className={`${styles["productID"]}`}>
                          {item.productId._id.toString()}
                        </div>
                        <div className={`${styles["image"]}`}>
                          <img
                            className={styles["product-img"]}
                            src={item.productId.img1}
                          />
                        </div>
                        <div className={`${styles["name"]}`}>
                          {item.productId.name}
                        </div>
                        <div className={`${styles["price"]}`}>
                          {moneyNumber(item.productId.price)} VND
                        </div>
                        <div className={`${styles["detail"]}`}>
                          {item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>
            </div>
          )}

          {/* INFORMATION FOR NO DATA */}
          {!orderDetail && (
            <section>
              {/* In case: This page begin loading */}
              <div
                className={`${styles["text-infor"]} ${styles["begin-loading"]} `}
              >
                Your order list in here!
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  );
}
