import { selector } from "recoil";
import { userState } from "../atoms/userState";

export const authTokenState = selector({
  key: "authTokenState",
  get: ({ get }) => {
    const state = get(userState);
    return state.authToken;
  },
});
