import { selector } from "recoil";
import { userState } from "../atoms/userState";

export const userFirstNameState = selector({
  key: "userFirstNameState",
  get: ({ get }) => {
    const state = get(userState);
    return state.firstName;
  },
});
