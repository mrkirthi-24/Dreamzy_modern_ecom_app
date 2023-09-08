import { atom } from "recoil";
import { Product } from "./productState";

interface CartState {
  products: Product[];
}

export const cartState = atom<CartState>({
  key: "cartState",
  default: {
    products: [],
  },
});
