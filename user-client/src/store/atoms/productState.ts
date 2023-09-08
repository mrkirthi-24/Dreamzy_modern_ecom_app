import { atom } from "recoil";

export interface Product {
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

export const productState = atom<ProductState>({
  key: "productState",
  default: {
    products: [],
  },
});
