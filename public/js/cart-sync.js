class CartSync {
  constructor(storageKey = 'oldrao-cart') {
    this.storageKey = storageKey;
  }

  count() {
    try {
      const raw = localStorage.getItem(this.storageKey);
      const state = raw ? JSON.parse(raw) : {};
      return Object.values(state).reduce((sum, item) => sum + item.qty, 0);
    } catch {
      return 0;
    }
  }

  updateCounter() {
    const counters = document.querySelectorAll('.cart-counter');
    const count = this.count();
    counters.forEach(counter => {
      counter.textContent = String(count);
    });
  }

  init() {
    this.updateCounter();
    
    window.addEventListener('storage', (e) => {
      if (e.key === this.storageKey) {
        this.updateCounter();
      }
    });
    
    const originalSetItem = localStorage.setItem;
    const self = this;
    localStorage.setItem = function(key, value) {
      originalSetItem.apply(this, arguments);
      if (key === self.storageKey) {
        self.updateCounter();
      }
    };
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const cartSync = new CartSync();
  cartSync.init();
});
