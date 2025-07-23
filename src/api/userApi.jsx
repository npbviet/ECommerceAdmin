import { getFetching } from "../utils/fetchHelpers";

const API = import.meta.env.VITE_API_URL || process.env.REACT_APP_API_URL;
export async function getAllUsers() {
  return await getFetching(`${API}/admin/get-users`, "Get all users failed");
}
