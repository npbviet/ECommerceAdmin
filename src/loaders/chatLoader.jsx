// loaders/chatLoader.js
import { checkLogin, getUserRole } from "../api/authApi";
import { redirect } from "react-router-dom";

export async function loaderForChatPage() {
  const isLoggedIn = await checkLogin();
  if (!isLoggedIn) return redirect("/admin/login");

  const role = await getUserRole();
  if (role !== "consultant" && role !== "admin")
    return redirect("/admin/login");

  return null;
}
