import { protectRouterLoader } from "./routeProtection";
import { getAllOrders } from "../api/orderApi";
import { getAllUsers } from "../api/userApi";
import { checkLogin, getUserRole } from "../api/authApi";
import { redirect } from "react-router";

// export async function loaderForDashBoard() {
//   const [isLogout, users, orders] = await Promise.all([
//     protectRouterLoader({ request: window.location }),
//     getAllUsers(),
//     getAllOrders(),
//   ]);

//   if (isLogout) return null;
//   return { users, orders };
// }
export async function loaderForDashBoard({ request }) {
  const isLoggedIn = await checkLogin();
  if (!isLoggedIn) return redirect("/admin/login");

  const role = await getUserRole();

  // Chỉ admin được vào dashboard
  if (role !== "admin") {
    if (role === "consultant") return redirect("/chat");
    return redirect("/admin/login");
  }

  // Trả dữ liệu cần thiết
  const users = await getAllUsers(); // giả sử bạn có hàm này
  const orders = await getAllOrders(); // giả sử bạn có hàm này

  return { users, orders };
}
