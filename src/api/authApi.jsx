import { getFetching } from "../utils/fetchHelpers";

const API = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;

export async function checkLogin() {
  const data = await getFetching(
    `${API}/admin/getActiveUserInfor`,
    "Check login failed"
  );
  return data?.isLoggedIn || false;
}

export async function getUserRole() {
  const data = await getFetching(
    `${API}/admin/getActiveUserInfor`,
    "Get role failed"
  );
  return data.role;
}

export async function getActiveUserInfor() {
  return await getFetching(
    `${API}/admin/getActiveUserInfor`,
    "Get active user info failed"
  );
}

export async function logoutUser() {
  await getFetching(`${API}/admin/logout`, "Logout failed", "text");
  return true;
}
