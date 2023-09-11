import { atom } from "recoil";

export interface Product {
  _id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  mrp: number;
  sell: number;
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
