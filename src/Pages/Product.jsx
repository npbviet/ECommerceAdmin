import { Link, useLoaderData, useNavigate } from "react-router-dom";
import styles from "./Product.module.css";
import { getAllProducts, postDeleteProduct } from "../api/productApi";
import { useEffect, useState } from "react";

export default function Product() {
  const navigate = useNavigate();
  const productArr = useLoaderData();
  const [productData, setProductData] = useState(productArr);
  const [deletedProd, setDeletedProd] = useState(null);

  const BASE_URL =
    import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;

  const moneyNumber = (num) => {
    return Number(num).toLocaleString(`de-DE`);
  };
  // Define list of products element: "productListEL"
  const productListEL = (
    <div className={styles["list-container"]}>
      {/* <!-- Header --> */}
      <div className={`${styles["header"]}  ${styles["custom-border"]}`}>
        <div className={`${styles["product-ID"]}`}>ID</div>
        <div className={`${styles["product-name"]}`}>Name</div>
        <div className={`${styles["price"]}`}>Price</div>
        <div className={`${styles["image"]}`}>Image</div>
        <div className={`${styles["category"]}`}>Category</div>
        <div className={`${styles["edit"]}`}>Edit</div>
      </div>
      <div className={styles["container-content"]}>
        {productData.map((item, index) => (
          /* <!-- Content --> */
          <div key={index} className={`${styles["content"]}  `}>
            <div className={`${styles["product-ID"]}`}>{item._id}</div>
            <div className={`${styles["product-name"]}`}>{item.name}</div>
            <div className={`${styles["price"]}`}>
              {moneyNumber(item.price).replace("VND", "")}
            </div>
            <div className={`${styles["image"]}`}>
              <img
                className={styles["product-img"]}
                src={
                  item.img1.startsWith("http")
                    ? item.img1
                    : `${BASE_URL}/${item.img1.replace(/\\/g, "/")}`
                }
              />
            </div>
            <div className={`${styles["category"]}`}>{item.category}</div>
            <div className={`${styles["edit"]}`}>
              <button
                className={styles["update-btn"]}
                onClick={() => navigate(item._id)}
              >
                Update
              </button>
              <button
                className={styles["delete-btn"]}
                onClick={() => {
                  deleteProductByIdHandler(item._id);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // This function to handle onChange event of input search
  async function onChangeSearchInputHandler(event) {
    // Get "searchKey" from input
    const searchKey = event.target.value.toLowerCase();

    // Filter all product have "name" property includes "searchKey"
    const searchResult = productArr.filter((product) =>
      product.name.toLowerCase().includes(searchKey)
    );
    setProductData(searchResult);
  }

  // This function to delete product by Id
  async function deleteProductByIdHandler(productID) {
    const confirm = window.confirm("Do you realy want to delete this product?");
    if (confirm) {
      // Call function to delete product by productID
      await postDeleteProduct(productID);

      // Show success information
      alert("Delete product is successful!");

      // Set value for "deletedProd" state to update component
      setDeletedProd({ productID });
    }
  }

  // This "useEffect()" hook to update this component (re-render component) when
  useEffect(() => {
    getAllProducts()
      .then((data) => {
        setProductData(data);
      })
      .catch((err) =>
        console.log("Error in useEffect for delete product: ", err)
      );
  }, [deletedProd]);

  return (
    <div className={`${styles["dash-board-container"]} `}>
      <div className={`${styles["product-list"]}`}>
        {/* ======================= Section-1: Search Input ========================*/}
        <div className={styles["page-content"]}>
          <p className={`${styles["title-list-products"]} `}>Products</p>
          <div className={styles["div-control"]}>
            <input
              className={`${styles["search-input"]} `}
              type="text"
              placeholder="Enter Search!"
              onChange={onChangeSearchInputHandler}
            />
            <Link className={styles["add-new-btn"]} to="/products/new-product">
              Add New
            </Link>
          </div>
        </div>

        {/* ===================== Section-2 Product list ==================== */}
        {/* In case: Found product data */}
        {productData?.length > 0 && (
          <div className={styles["page-content"]}>{productListEL}</div>
        )}

        {/* In case: Not found product data */}
        {productData?.length === 0 && (
          <div className={`${styles["text-infor"]} ${styles["no-product"]}`}>
            Not found product data!
          </div>
        )}
      </div>
    </div>
  );
}
