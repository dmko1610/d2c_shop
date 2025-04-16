import {makeAutoObservable} from 'mobx';
import {sendAnalyticsEvent} from '../api/analytics';

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
    this.trackAnalytics();
  }

  removeItem(productId: string) {
    this.items = this.items.filter(item => item.id !== productId);
    this.trackAnalytics();
  }

  toggleOption(option: Option) {
    const exists = this.options.find(o => o.id === option.id);
    if (exists) {
      this.options = this.options.filter(o => o.id !== option.id);
    } else {
      this.options.push(option);
    }
    this.trackAnalytics();
  }

  get total() {
    return this.items.reduce((sum, item) => sum + item.price, 0);
  }

  clearCart() {
    this.items = [];
    this.options = [];
  }

  private async trackAnalytics() {
    const success = await sendAnalyticsEvent(this.items, this.options);

    if (success) {
      console.log('Analytics send successfully');
    } else {
      console.log('Analytics failed to send ');
    }
  }
}

export const cartStore = new CartStore();
