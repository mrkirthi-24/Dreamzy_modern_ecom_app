import { atom } from "recoil";

interface User {
  authToken: string | null;
  firstName: string;
  userEmail: string;
}

export const userState = atom<User>({
  key: "userState",
  default: {
    authToken: "",
    firstName: "",
    userEmail: "",
  },
});
