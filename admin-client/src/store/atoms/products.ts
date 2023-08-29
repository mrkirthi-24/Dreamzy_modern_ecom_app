import { atom } from "recoil";
import { Product } from "../../components/Products";

interface ProductState {
  products: Product[];
}

export const productsState = atom<ProductState>({
  key: "productState",
  default: {
    products: [],
  },
});
