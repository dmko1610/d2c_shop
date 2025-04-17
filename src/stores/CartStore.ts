import { makeAutoObservable, reaction, runInAction } from 'mobx';
import { sendAnalyticsEvent } from '../api/analytics';
import { CartItem, Option, Product } from './types';

class CartStore {
  items: CartItem[] = [];
  options: Option[] = [];

  constructor() {
    makeAutoObservable(this);

    reaction(
      () => [
        this.items.map(i => `${i.product.id}:${i.quantity}`).join(','),
        this.options.map(o => o.id),
      ],
      async () => {
        const success = await sendAnalyticsEvent(this.items, this.options);
        runInAction(() => {
          console.log(success ? 'Analytics sent' : 'Analytics failed');
        });
      },
    );
  }

  addItem(product: Product) {
    const existing = this.items.find(i => i.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      this.items.push({ product, quantity: 1 });
    }
  }

  removeItem(productId: string) {
    const index = this.items.findIndex(i => i.product.id === productId);
    if (index !== -1) {
      const item = this.items[index];
      if (item.quantity > 1) {
        item.quantity -= 1;
      } else {
        this.items.splice(index, 1);
      }
    }
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
    return this.items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0,
    );
  }

  clearCart() {
    this.items = [];
    this.options = [];
  }
}

export const cartStore = new CartStore();
