import { redirect } from "react-router-dom";
import { protectRouterLoader } from "./routeProtection";
import { getUserRole } from "../api/authApi";
import { getAllProducts, getProductById } from "../api/productApi";

export async function loaderForProducts() {
  const [isLogout, role, products] = await Promise.all([
    protectRouterLoader({ request: window.location }),
    getUserRole(),
    getAllProducts(),
  ]);

  if (isLogout) return null;
  if (role !== "admin") return redirect("/");
  return products;
}

export async function loaderForProductById({ params }) {
  const [isLogout, role, product] = await Promise.all([
    protectRouterLoader({ request: window.location }),
    getUserRole(),
    getProductById(params.productID),
  ]);

  if (isLogout) return null;
  if (role !== "admin") return redirect("/");
  return product;
}
