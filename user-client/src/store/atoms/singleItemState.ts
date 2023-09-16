import { atom } from "recoil";
import { Product } from "./productState";

interface SingleItemState {
  loading: boolean;
  singleItem: Product | null;
}

export const singleItemState = atom<SingleItemState>({
  key: "singleItemState",
  default: {
    loading: true,
    singleItem: null,
  },
});
