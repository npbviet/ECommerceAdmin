import { Form, useNavigate } from "react-router-dom";
import styles from "./NewProduct.module.css";
import { Fragment, useRef, useState } from "react";

import { checkLogin } from "../../api/authApi";
import { postAddNewProduct } from "../../api/productApi";

export default function NewProduct() {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [shortDescLength, setShortDescLength] = useState(0);
  const [longDescLength, setLongDescLength] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const nameRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const shortDescRef = useRef();
  const longDescRef = useRef();
  const fileRef = useRef();

  const selectFileOnChangeHandler = (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 5) {
      alert("The maximum of files selected is 5 files!");
      fileRef.current.value = "";
      setSelectedFiles([]);
    } else {
      setSelectedFiles(files);
    }
  };

  const onChangePriceInputHandler = (e) => {
    if (e.target.value === "0" || e.target.value === "-") {
      e.target.value = null;
    }
  };

  const onKeyDownPriceInputHandler = (e) => {
    if (e.key === "-") e.preventDefault();
  };

  const validateInputForm = (refInput, messageText) => {
    if (refInput.current.value.trim() === "") {
      alert(messageText);
      return false;
    }
    return true;
  };

  const handleTextChange = (ref, setLength) => {
    const value = ref.current.value || "";
    setLength(value.length);
  };

  const onClickSubmitHandler = async () => {
    const inputsToValidate = [
      { ref: nameRef, msg: 'Enter value for "Product Name"' },
      { ref: categoryRef, msg: 'Enter value for "Category"' },
      { ref: priceRef, msg: 'Enter value for "Price"' },
      { ref: shortDescRef, msg: 'Enter value for "Short Description"' },
      { ref: longDescRef, msg: 'Enter value for "Long Description"' },
      { ref: fileRef, msg: "Select image file to upload" },
    ];

    for (const input of inputsToValidate) {
      if (!validateInputForm(input.ref, input.msg)) return;
    }

    const productData = {
      name: nameRef.current.value,
      category: categoryRef.current.value,
      price: priceRef.current.value,
      short_desc: shortDescRef.current.value,
      long_desc: longDescRef.current.value,
      images: selectedFiles,
    };

    const isLoggedIn = await checkLogin();
    if (!isLoggedIn) return navigate("/admin/login");

    const resData = await postAddNewProduct(productData);
    if (resData.isErrorValidate) {
      setErrorMessage(resData.message);
    } else {
      alert("Add new product is successful!");
      navigate("/products");
    }
  };

  return (
    <Fragment>
      <div className={styles["page-title"]}>Add New Product</div>

      <Form encType="multipart/form-data">
        <div className={styles["div-form"]}>
          {/* Product Name */}
          <div className={styles["div-input"]}>
            <label>Product Name</label>
            <input type="text" placeholder="Enter Product Name" ref={nameRef} />
          </div>

          {/* Category */}
          <div className={styles["div-input"]}>
            <label>Category</label>
            <input type="text" placeholder="Enter Category" ref={categoryRef} />
          </div>

          {/* Price */}
          <div className={styles["div-input"]}>
            <label>Price</label>
            <input
              type="number"
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
              placeholder="Enter Short Description"
              ref={shortDescRef}
              onChange={() =>
                handleTextChange(shortDescRef, setShortDescLength)
              }
            />
            <span>{shortDescLength}/500</span>
          </div>

          {/* Long Description */}
          <div className={styles["div-input"]}>
            <label>Long Description</label>
            <textarea
              className={styles["long-desc"]}
              placeholder="Enter Long Description"
              ref={longDescRef}
              onChange={() => handleTextChange(longDescRef, setLongDescLength)}
            />
            <span>{longDescLength}/2000</span>
          </div>

          {/* Upload Image */}
          <div className={styles["div-input"]}>
            <label>Upload Image (5 images)</label>
            <input
              className={styles["upload-file"]}
              type="file"
              accept="image/*"
              multiple
              ref={fileRef}
              onChange={selectFileOnChangeHandler}
            />
          </div>

          {/* Submit */}
          <div className={styles["submit-div"]}>
            <button
              className={styles["submit-btn"]}
              type="button"
              onClick={onClickSubmitHandler}
            >
              Submit
            </button>

            {errorMessage && (
              <span className={styles["error-message"]}>{errorMessage}</span>
            )}
          </div>
        </div>
      </Form>
    </Fragment>
  );
}
