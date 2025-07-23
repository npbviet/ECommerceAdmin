// src/api/orderApi.js
import { getFetching } from "../utils/fetchHelpers";

const API = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;

export async function getAllOrders() {
  return await getFetching(`${API}/admin/get-orders`, "Get orders failed");
}

export async function getOrderById(orderID) {
  const response = await fetch(`${API}/admin/get-order-by-id`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ orderID }),
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("Get order by ID failed");
  }

  return await response.json();
}
