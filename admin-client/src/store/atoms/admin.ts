import { atom } from "recoil";

interface Admin {
  authToken: string | null;
  adminEmail: string;
}

export const adminState = atom<Admin>({
  key: "adminState",
  default: {
    authToken: "",
    adminEmail: "",
  },
});
