import { atom } from "recoil";
import { Product } from "./productState";

interface savelaterState {
  products: Product[];
}

export const savelaterState = atom<savelaterState>({
  key: "savelaterState",
  default: {
    products: [],
  },
});
