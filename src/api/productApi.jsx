import { getFetching, postFetching } from "../utils/fetchHelpers";

const API = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;

export async function getAllProducts() {
  return await getFetching(
    `${API}/admin/get-products`,
    "Get all products failed"
  );
}

export async function getProductById(productID) {
  return await postFetching(
    `${API}/admin/get-product-byId`,
    { productID },
    "Get product by ID failed"
  );
}

export async function postAddNewProduct(productData) {
  const {
    name,
    category,
    price,
    short_desc,
    long_desc,
    images: files,
  } = productData;
  const productInfor = { name, category, price, short_desc, long_desc };

  const formData = new FormData();
  for (let file of files) {
    formData.append("fileUpload", file);
  }
  formData.append("productInfor", JSON.stringify(productInfor));

  const res = await fetch(`${API}/admin/product/add`, {
    method: "POST",
    body: formData,
    credentials: "include",
  });

  return await res.json();
}

export async function postEditProduct(productData) {
  const { productID, name, category, price, short_desc, long_desc } =
    productData;

  return await postFetching(
    `${API}/admin/product/edit`,
    {
      productInfor: { productID, name, category, price, short_desc, long_desc },
    },
    "Edit product failed"
  );
}

export async function postDeleteProduct(productID) {
  return await postFetching(
    `${API}/admin/product/delete`,
    { productID },
    "Delete product failed"
  );
}
