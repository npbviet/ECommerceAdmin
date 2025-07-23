import { getActiveUserInfor } from "../api/authApi";

export async function getActiveUserInforLoader() {
  return await getActiveUserInfor();
}
