export type CartItem = {
  product: Product;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Option {
  id: string;
  label: string;
}