class Product {
    constructor({ id, name, price, image}) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.image = image || null;
    }
}

class Category {
    constructor(name, items = []) {
        this.name = name;
        this.items = items.map((item, idx) => new Product({ id: `${name}-${idx}`, ...item }));
    }
}

class Cart {
    constructor(storageKey = 'oldrao-cart') {
        this.storageKey = storageKey;
        this.state = this._load();
    }

    _load() {
        try {
            const raw = localStorage.getItem(this.storageKey);
            return raw ? JSON.parse(raw) : {};
        } catch {
            return {};
        }
    }

    _save() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.state));
    }

    add(productID, productData) {
        if (!this.state[productID]) {
            this.state[productID]  = { qty: 0, ...productData };
        }
        this.state[productID].qty += 1;
        this._save();
    }

    count() {
        return Object.values(this.state).reduce((sum, item) => sum + item.qty, 0);
    }
}

class Store {
    constructor({ jsonUrl, containerSelector, counter}) {
        this.jsonUrl = jsonUrl;
        this.containerSelector = containerSelector;
        this.counterSelector = counter;
        this.categories = [];
        this.cart = new Cart();
    }

    async init() {
        await this.loadData();
        this.render();
        this.bindEvents();
        this.updateCartCounter();
    }

    async loadData() {
        const res = await fetch(this.jsonUrl);
        if (!res.ok) throw new Error('Failed to load menu JSON');
        const data = await res.json();

        const order = [
            'ROYAL CURRIES',
            'FROM THE TANDOOR',
            'STREET FOOD MAGIC',
            'REFRESHING LASSIS & CHAI',
            'SWEET ENDINGS',
        ];
        this.categories = order
            .filter((name) => data[name])
            .map((name) => new Category(name, data[name]));
    }

    render() {
        const grids = document.querySelectorAll(this.containerSelector);
        grids.forEach((grid) => {
            const catName = grid.getAttribute('data-category');
            const category = this.categories.find((c) => c.name === catName);
            grid.innerHTML = category
                ? category.items
                    .map(
                        (p) => `
                        <div class="product-item" data-id="${p.id}">
                            <div class="product-image-placeholder"${p.image ? ` style="background-image:url('${p.image}'); background-size:cover;"` : ''}></div>
                            <p class="product-name">${p.name}</p>
                            <p class="product-price">Rs. ${p.price}</p>
                            <button class="add-btn" aria-label="Add ${p.name}">+</button>
                        </div>
                        `
                    ).join('')
                : '<p>No items available</p>';
        });
    }

    bindEvents() {
        document.addEventListener('click', (e) => {
            const btn = e.target.closest('.add-btn');
            if (!btn) return;
            const item = btn.closest('.product-item');
            if (!item) return;
            const id = item.getAttribute('data-id');
            
            // Get price from the actual product object, not DOM parsing
            const product = this.categories
                .flatMap(cat => cat.items)
                .find(p => p.id === id);
            
            if (!product) return;
            this.cart.add(id, { name: product.name, price: product.price });
            this.updateCartCounter();
            btn.classList.add('added');
            setTimeout(() => btn.classList.remove('added'), 300);
        });
    }

    updateCartCounter() {
        const el = document.querySelector(this.counterSelector);
        if (el) el.textContent = String(this.cart.count());
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const store = new Store({
        jsonUrl: '../data/menu.json',
        containerSelector: '.product-grid[data-category]',
        counter: '.cart-counter',
    });
    store.init().catch((err) => console.error(err));
});
