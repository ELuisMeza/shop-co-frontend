import type { RolesUser } from "../lib/roles";
import { useUserStore } from "../stores/user.store";

export const isUserType = (role: RolesUser) => {
  const user = useUserStore.getState().user;
  return user?.role?.name?.toLowerCase() === role;
}