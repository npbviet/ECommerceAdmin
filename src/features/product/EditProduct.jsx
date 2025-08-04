import { Form, useLoaderData, useNavigate } from "react-router-dom";
import styles from "./NewProduct.module.css";
import { Fragment, useEffect, useRef, useState } from "react";
import { checkLogin } from "../../api/authApi";
import { postEditProduct } from "../../api/productApi";

export default function EditProduct() {
  const productInfor = useLoaderData();
  const navigate = useNavigate();

  const nameRef = useRef();
  const categoryRef = useRef();
  const priceRef = useRef();
  const shortDescRef = useRef();
  const longDescRef = useRef();

  const [shortDescLength, setShortDescLength] = useState(0);
  const [longDescLength, setLongDescLength] = useState(0);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (productInfor) {
      nameRef.current.value = productInfor.name;
      categoryRef.current.value = productInfor.category;
      priceRef.current.value = productInfor.price;
      shortDescRef.current.value = productInfor.short_desc;
      longDescRef.current.value = productInfor.long_desc;
      setShortDescLength(productInfor.short_desc.length);
      setLongDescLength(productInfor.long_desc.length);
    }
  }, [productInfor]);

  function onChangePriceInputHandler(e) {
    const priceValue = e.target.value;
    if (priceValue === "0" || priceValue === "-") {
      e.target.value = null;
    }
  }

  function onKeyDownPriceInputHandler(e) {
    if (e.key === "-") e.preventDefault();
  }

  function handleBlurLength(ref, setLength) {
    const value = ref.current?.value || "";
    setLength(value.length);
  }

  function validateInputForm(refInput, messageText) {
    if (!refInput.current.value.trim()) {
      alert(messageText);
      return false;
    }
    return true;
  }

  async function onClickSubmitHandler() {
    const inputFields = [
      { ref: nameRef, msg: 'Enter value for "Product Name"' },
      { ref: categoryRef, msg: 'Enter value for "Category"' },
      { ref: priceRef, msg: 'Enter value for "Price"' },
      { ref: shortDescRef, msg: 'Enter value for "Short Description"' },
      { ref: longDescRef, msg: 'Enter value for "Long Description"' },
    ];

    for (let field of inputFields) {
      if (!validateInputForm(field.ref, field.msg)) return;
    }

    const productData = {
      productID: productInfor._id,
      name: nameRef.current.value,
      category: categoryRef.current.value,
      price: priceRef.current.value,
      short_desc: shortDescRef.current.value,
      long_desc: longDescRef.current.value,
    };

    const isLoggedIn = await checkLogin();
    if (!isLoggedIn) return navigate("/admin/login");

    const resData = await postEditProduct(productData);

    if (resData.isErrorValidate) {
      setErrorMessage(resData.message);
    } else {
      alert("Edit product is successful!");
      navigate("/products");
    }
  }

  return (
    <Fragment>
      <div className={styles["page-title"]}>Edit Product</div>

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
              onBlur={() => handleBlurLength(shortDescRef, setShortDescLength)}
            />
            <span>{shortDescLength}/500</span>
          </div>

          {/* Long Description */}
          <div className={styles["div-input"]}>
            <label>Long Description</label>
            <textarea
              className={styles["long-desc"]}
              name="long_desc"
              placeholder="Enter Long Description"
              ref={longDescRef}
              onBlur={() => handleBlurLength(longDescRef, setLongDescLength)}
            />
            <span>{longDescLength}/2000</span>
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
