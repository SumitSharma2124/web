// Lightweight Cart reader for checkout page
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
  save() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.state));
  }
  clear() {
    this.state = {};
    this.save();
  }
  remove(productID) {
    delete this.state[productID];
    this.save();
  }
  count() {
    return Object.values(this.state).reduce((sum, item) => sum + item.qty, 0);
  }
  items() {
    return Object.entries(this.state).map(([id, v]) => ({
      id,
      name: v.name,
      price: Number(v.price) || 0,
      qty: Number(v.qty) || 0,
      lineTotal: (Number(v.price) || 0) * (Number(v.qty) || 0),
    }));
  }
}

function formatCurrency(n) {
  return `₹${n.toFixed(0)}`;
}

function updateCounter(cart) {
  const el = document.querySelector('.cart-counter');
  if (el) el.textContent = String(cart.count());
}

function renderCart(cart) {
  const list = document.querySelector('.cart-list');
  if (!list) return;

  const items = cart.items();
  if (!items.length) {
    list.innerHTML = '<li><span>Your cart is empty</span><span>—</span></li>';
    appendTotal(list, 0);
    updateCounter(cart);
    return;
  }

  list.innerHTML = items
    .map(
      (it) => `
      <li data-id="${it.id}">
        <span>${it.name} × ${it.qty}</span>
        <span>${formatCurrency(it.lineTotal)}</span>
        <button class="remove-btn" data-id="${it.id}" style="margin-left:10px;">✖</button>
      </li>
    `
    )
    .join('');

  const subtotal = items.reduce((s, it) => s + it.lineTotal, 0);
  appendTotal(list, subtotal);
  updateCounter(cart);
  document.querySelectorAll('.remove-btn').forEach((btn) =>
    btn.addEventListener('click', (e) => {
      const id = e.target.getAttribute('data-id');
      cart.remove(id);
      renderCart(cart); // re-render after removal
    })
  );
}

function appendTotal(list, total) {
  const old = list.querySelector('li.total');
  if (old) old.remove();
  const li = document.createElement('li');
  li.className = 'total';
  li.innerHTML = `<span>Total</span><span>${formatCurrency(total)}</span>`;
  list.appendChild(li);
}

function bindPlaceOrder(cart) {
  const btn = document.querySelector('.delivery-btn');
  if (!btn) return;
  btn.addEventListener('click', (e) => {
    e.preventDefault();
    cart.clear();
    updateCounter(cart);
    window.location.href = 'thank-you-screen.html';
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const cart = new Cart();
  renderCart(cart);
  bindPlaceOrder(cart);
});