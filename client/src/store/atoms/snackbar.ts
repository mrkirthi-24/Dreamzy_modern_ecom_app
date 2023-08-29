import { atom } from "recoil";

export interface SnackbarState {
  open: boolean;
  message: string;
  type: "success" | "error" | "warning" | "info";
}

export const snackbarState = atom<SnackbarState>({
  key: "snackbarState",
  default: {
    open: false,
    message: "",
    type: "success",
  },
});
