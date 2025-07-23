import { Form, useLoaderData, useNavigate } from "react-router-dom";
import styles from "./NewProduct.module.css";
import { Fragment, useEffect, useRef, useState } from "react";
import { checkLogin } from "../../api/authApi";
import { postEditProduct } from "../../api/productApi";

export default function EditProduct() {
  const productInfor = useLoaderData();
  const [isErrorValidate, setIsErrorValidate] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const navigate = useNavigate();

  // Define refs for input
  const nameRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const shortDescRef = useRef();
  const longDescRef = useRef();

  // This function to handle "onChange()" event of "Price" input
  function onChangePriceInputHandler(e) {
    const priceValue = e.target.value;
    if (priceValue === "0" || priceValue === "-") {
      e.target.value = null;
    }
  }

  // This function to handle "onBlur()" event of "Price" input
  function onKeyDownPriceInputHandler(e) {
    if (e.key === "-") {
      // Prevent to press minus key: "-"
      e.preventDefault();
    }
  }

  // This function to validate input value of form
  function validateInputForm(refInput, messageText) {
    if (refInput.current.value.trim() === "") {
      alert(messageText);
      return "stop";
    }
  }

  // This function to handle onclick event of "Send" button
  async function onClickSubmitHandler() {
    // Define an input array
    const valueInputArr = [
      {
        valueInput: nameRef,
        messageText: 'Enter value for "Product Name" input',
      },
      {
        valueInput: categoryRef,
        messageText: 'Enter value for "Category" input',
      },
      {
        valueInput: priceRef,
        messageText: 'Enter value for "Price" input',
      },
      {
        valueInput: shortDescRef,
        messageText: 'Enter value for "Short Description" input',
      },
      {
        valueInput: longDescRef,
        messageText: 'Enter value for "Long Description" input',
      },
    ];

    // Validate for other inputs
    for (let i = 0; i < valueInputArr.length; i++) {
      const validateResult = validateInputForm(
        valueInputArr[i].valueInput,
        valueInputArr[i].messageText
      );
      if (validateResult === "stop") return;
    }

    const productData = {
      productID: productInfor._id,
      name: nameRef.current.value,
      category: categoryRef.current.value,
      price: priceRef.current.value,
      short_desc: shortDescRef.current.value,
      long_desc: longDescRef.current.value,
    };

    // Add new hotel to database
    const isLoggedIn = await checkLogin();
    if (isLoggedIn) {
      const resData = await postEditProduct(productData);
      if (resData.isErrorValidate) {
        setIsErrorValidate(true);
        setErrorMessage(resData.message);
      } else {
        setIsErrorValidate(false);
        alert("Edit product is successful!");
        navigate("/products");
      }
    } else {
      navigate("/admin/login");
    }
  }

  // This "useEffect()" hook to fill up value for edit form
  useEffect(() => {
    if (productInfor) {
      nameRef.current.value = productInfor.name;
      categoryRef.current.value = productInfor.category;
      priceRef.current.value = productInfor.price;
      shortDescRef.current.value = productInfor.short_desc;
      longDescRef.current.value = productInfor.long_desc;
    }
  }, []);

  return (
    <Fragment>
      {/* Page Title */}
      <div className={styles["page-title"]}>Edit Product</div>

      {/* Add New Product Form */}
      <Form encType="multipart/form-data">
        <div className={styles["div-form"]}>
          {/* Product Name */}
          <div className={styles["div-input"]}>
            <label>Product Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter Product Name"
              ref={nameRef}
            />
          </div>

          {/* Category */}
          <div className={styles["div-input"]}>
            <label>Category</label>
            <input
              type="text"
              name="category"
              placeholder="Enter Category"
              ref={categoryRef}
            />
          </div>

          {/* Price */}
          <div className={styles["div-input"]}>
            <label>Price</label>
            <input
              type="number"
              name="price"
              min={1}
              placeholder="Enter Price"
              ref={priceRef}
              onChange={onChangePriceInputHandler}
              onKeyDown={onKeyDownPriceInputHandler}
            />
          </div>

          {/* Short Description */}
          <div className={styles["div-input"]}>
            <label>Short Description</label>
            <textarea
              className={styles["short-desc"]}
              name="short_desc"
              placeholder="Enter Short Description"
              ref={shortDescRef}
            />
          </div>

          {/* Long Description */}
          <div className={styles["div-input"]}>
            <label>Long Description</label>
            <textarea
              className={styles["long-desc"]}
              name="long_desc"
              placeholder="Enter Long Description"
              ref={longDescRef}
            />
          </div>

          <div className={styles["submit-div"]}>
            {/* Submit Button */}
            <button
              className={styles["submit-btn"]}
              type="button"
              onClick={onClickSubmitHandler}
            >
              Submit
            </button>

            {/* Error Message */}
            {errorMessage && (
              <span className={styles["error-message"]}>{errorMessage}</span>
            )}
          </div>
        </div>
      </Form>
    </Fragment>
  );
}
