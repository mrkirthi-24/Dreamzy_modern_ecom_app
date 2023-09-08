interface ProductCategory {
  image: string;
  title: string;
  link: string;
}

interface BannerData {
  id: number;
  url: string;
}

export const productCategory: ProductCategory[] = [
  {
    image:
      "https://rukminim1.flixcart.com/flap/64/64/image/29327f40e9c4d26b.png?q=100",
    title: "Grocery",
    link: "/products",
  },
  {
    image:
      "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/0d75b34f7d8fbcb3.png?q=100",
    title: "Fashion",
    link: "/products",
  },
  {
    image:
      "https://rukminim1.flixcart.com/flap/64/64/image/22fddf3c7da4c4f4.png?q=100",
    title: "Mobiles",
    link: "/products",
  },
  {
    image:
      "https://rukminim1.flixcart.com/flap/64/64/image/ab7e2b022a4587dd.jpg?q=100",
    title: "Home & Furniture",
    link: "/products",
  },
  {
    image:
      "https://rukminim1.flixcart.com/flap/64/64/image/69c6589653afdb9a.png?q=100",
    title: "Electronics",
    link: "/products",
  },
  {
    image:
      "https://rukminim1.flixcart.com/flap/64/64/image/dff3f7adcf3a90c6.png?q=100",
    title: "Beauty & Toys",
    link: "/products",
  },
  {
    image:
      "https://rukminim1.flixcart.com/flap/64/64/image/71050627a56b4693.png?q=100",
    title: "Travel",
    link: "/products",
  },
  {
    image:
      "https://rukminim1.flixcart.com/fk-p-flap/64/64/image/05d708653beff580.png?q=100",
    title: "Two Wheelers",
    link: "/products",
  },
];

export const bannerData: BannerData[] = [
  {
    id: 1,
    url: "https://rukminim1.flixcart.com/flap/3376/560/image/d117a62eb5fbb8e1.jpg?q=50",
  },
  {
    id: 2,
    url: "https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50",
  },
  {
    id: 3,
    url: "https://rukminim1.flixcart.com/flap/3376/560/image/ae9966569097a8b7.jpg?q=50",
  },
  {
    id: 4,
    url: "https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50",
  },
];
