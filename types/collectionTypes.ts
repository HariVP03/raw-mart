export type item = {
  id: string;
  name: string;
  price: number;
  currency: string;
  sale?: boolean;
  discount?: number;
  description: string;
  reviews: number;
  stock: number;
  sellerId: string;
  cartUserId: null;
  category: string;
  images: string[];
};

export type seller = {
  id: string;
  name: string;
  email: string;
  address: string;
};

export type cart = {
  id: string;
  email: string;
  items: item[];
};
