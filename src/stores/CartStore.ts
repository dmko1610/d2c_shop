import {makeAutoObservable} from 'mobx';

export interface Product {
  id: string;
  name: string;
  price: number;
}

export interface Option {
  id: string;
  label: string;
}

class CartStore {
  items: Product[] = [];
  options: Option[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addItem(product: Product) {
    this.items.push(product);
  }

  removeItem(productId: string) {
    this.items = this.items.filter(item => item.id !== productId);
  }

  toggleOption(option: Option) {
    const exists = this.options.find(o => o.id === option.id);
    if (exists) {
      this.options = this.options.filter(o => o.id !== option.id);
    } else {
      this.options.push(option);
    }
  }

  get total() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  clearCart() {
    this.items = [];
    this.options = [];
  }
}

export const cartStore = new CartStore();
