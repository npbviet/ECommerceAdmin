// import { redirect } from "react-router-dom";
// import { checkLogin } from "../api/authApi";

// export async function protectRouterLoader() {
//   const isLoggedIn = await checkLogin();
//   if (!isLoggedIn) {
//     window.location.href = "/admin/login";
//     return true;
//   }
//   return false;
// }

// export async function handlerForLoginRouter() {
//   const isLoggedIn = await checkLogin();
//   return isLoggedIn ? redirect("/") : null;
// }
import { redirect } from "react-router-dom";
import { checkLogin, getUserRole } from "../api/authApi";

const API = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;
export async function protectRouterLoader({ request }) {
  const isLoggedIn = await checkLogin();

  if (!isLoggedIn) {
    // Nếu chưa login thì redirect login
    return redirect("/admin/login");
  }

  // Đã login -> lấy role
  const role = await getUserRole();

  // Lấy path hiện tại
  const base = typeof window !== "undefined" ? window.location.origin : API;
  const url = new URL(request.url, base);
  const pathname = url.pathname;

  // Nếu admin thì được truy cập tất cả admin routes
  if (role === "admin") {
    return null;
  }

  // Nếu consultant, chỉ cho phép truy cập livechat
  if (role === "consultant") {
    if (pathname === "/admin/livechat") {
      return null; // cho phép
    } else {
      return redirect("/admin/livechat"); // redirect về livechat
    }
  }

  // Các role khác hoặc không xác định redirect login
  return redirect("/admin/login");
}

export async function handlerForLoginRouter() {
  const isLoggedIn = await checkLogin();
  return isLoggedIn ? redirect("/") : null;
}
