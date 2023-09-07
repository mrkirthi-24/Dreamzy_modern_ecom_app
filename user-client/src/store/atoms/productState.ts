import { atom } from "recoil";

interface Product {
  _id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  quantity: number;
}

interface ProductState {
  products: Product[];
}

export const productsState = atom<ProductState>({
  key: "productState",
  default: {
    products: [],
  },
});
