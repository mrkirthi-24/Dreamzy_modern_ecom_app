import { selector } from "recoil";
import { adminState } from "../atoms/admin";

export const authTokenState = selector({
  key: "authTokenState",
  get: ({ get }) => {
    const state = get(adminState);
    return state.authToken;
  },
});
