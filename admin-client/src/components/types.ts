//Signup types
export interface CopyrightProps {
  sx?: Record<string, number>;
}

//Products types
export interface Product {
  _id: string;
  category: string;
  title: string;
  description: string;
  imageUrl: string;
  quantity: number;
}

export interface ProductCardProps {
  key?: number;
  product: Product;
  showAction?: boolean;
}

export interface GetProductsProps {
  products: Product[];
}

export interface EditProductDialogsProps {
  product: Product;
}

export interface CustomizedDialogsProps {
  product: Product;
}

export interface DialogTitleProps {
  id: string;
  children?: React.ReactNode;
  onClose: () => void;
}
