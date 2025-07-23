const API = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;

export async function loginAction({ request }) {
  const formData = await request.formData();
  const loginInfor = {
    email: formData.get("email"),
    password: formData.get("password"),
  };

  const response = await fetch(`${API}/admin/login`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(loginInfor),
    credentials: "include",
  });

  return await response.json();
}

export async function addNewProductAction({ request }) {
  const formData = await request.formData();
  const productData = {
    name: formData.get("name"),
    category: formData.get("category"),
    price: formData.get("price"),
    short_desc: formData.get("short_desc"),
    long_desc: formData.get("long_desc"),
    images: formData.getAll("fileUpload"),
  };

  // Gọi lại logic thực tế từ api
  const { postAddNewProduct } = await import("../api/productApi");
  return await postAddNewProduct(productData);
}
