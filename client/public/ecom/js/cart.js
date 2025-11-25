// Shopping Cart Management with localStorage

class ShoppingCart {
  constructor() {
    this.storageKey = 'ecom_cart';
    this.items = this.loadCart();
  }

  loadCart() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  saveCart() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    this.updateCartUI();
    this.dispatchCartUpdate();
  }

  addItem(product) {
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1
      });
    }
    
    this.saveCart();
    this.showConfetti();
    this.showToast(`Added ${product.name} to cart!`, 'success');
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveCart();
    this.showToast('Item removed from cart', 'info');
  }

  updateQuantity(productId, quantity) {
    const item = this.items.find(item => item.id === productId);
    if (item) {
      if (quantity <= 0) {
        this.removeItem(productId);
      } else {
        item.quantity = quantity;
        this.saveCart();
      }
    }
  }

  getTotal() {
    return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }

  getItemCount() {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  clearCart() {
    this.items = [];
    this.saveCart();
  }

  updateCartUI() {
    // Update cart badge
    const badge = document.querySelector('.cart-badge');
    if (badge) {
      const count = this.getItemCount();
      badge.textContent = count;
      badge.style.display = count > 0 ? 'flex' : 'none';
    }

    // Update mini cart
    this.updateMiniCart();
  }

  updateMiniCart() {
    const miniCartItems = document.querySelector('.mini-cart-items');
    const miniCartTotal = document.querySelector('.mini-cart-total-amount');
    
    if (!miniCartItems) return;

    if (this.items.length === 0) {
      miniCartItems.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: var(--space-lg);">Your cart is empty</p>';
      if (miniCartTotal) miniCartTotal.textContent = '$0.00';
      return;
    }

    miniCartItems.innerHTML = this.items.map(item => `
      <div class="mini-cart-item">
        <img src="${item.image}" alt="${item.name}" class="mini-cart-item-image">
        <div class="mini-cart-item-info">
          <div class="mini-cart-item-name">${item.name}</div>
          <div class="mini-cart-item-price">$${item.price.toFixed(2)} × ${item.quantity}</div>
        </div>
      </div>
    `).join('');

    if (miniCartTotal) {
      miniCartTotal.textContent = `$${this.getTotal().toFixed(2)}`;
    }
  }

  showConfetti() {
    const colors = ['#8b5cf6', '#ec4899', '#a78bfa', '#f472b6'];
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * 100 + 'vw';
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      confetti.style.animationDelay = Math.random() * 0.5 + 's';
      confetti.style.animationDuration = (Math.random() * 2 + 2) + 's';
      document.body.appendChild(confetti);
      
      setTimeout(() => confetti.remove(), 3000);
    }
  }

  showToast(message, type = 'info') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: var(--bg-secondary);
      color: var(--text-primary);
      padding: 1rem 1.5rem;
      border-radius: var(--radius-lg);
      box-shadow: var(--shadow-xl);
      z-index: 999;
      animation: slideInRight 0.3s ease-out;
      border-left: 4px solid ${type === 'success' ? 'var(--success)' : 'var(--primary)'};
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  dispatchCartUpdate() {
    window.dispatchEvent(new CustomEvent('cartUpdated', { 
      detail: { 
        items: this.items, 
        total: this.getTotal(),
        count: this.getItemCount()
      } 
    }));
  }
}

// Initialize cart
const cart = new ShoppingCart();

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.ShoppingCart = cart;
}
