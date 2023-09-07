//admin
export interface adminDetails {
  fullname?: string;
  username: string;
  password: string;
}

//user
export interface userDetails {
  fullname?: string;
  phone: string;
  username: string;
  password: string;
  address?: string;
  purchasedProducts?: Array<string>;
  wishlistProducts?: Array<string>;
}

//product
export interface productDetails {
  category: string;
  title: string;
  description?: string;
  imageUrl: string;
  quantity: number;
}
