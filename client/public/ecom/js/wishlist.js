// Wishlist Management with localStorage

class Wishlist {
  constructor() {
    this.storageKey = 'ecom_wishlist';
    this.items = this.loadWishlist();
  }

  loadWishlist() {
    const stored = localStorage.getItem(this.storageKey);
    return stored ? JSON.parse(stored) : [];
  }

  saveWishlist() {
    localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    this.updateWishlistUI();
    this.dispatchWishlistUpdate();
  }

  toggleItem(product) {
    const existingIndex = this.items.findIndex(item => item.id === product.id);
    
    if (existingIndex !== -1) {
      this.items.splice(existingIndex, 1);
      this.showToast(`Removed ${product.name} from wishlist`, 'info');
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        addedAt: Date.now()
      });
      this.showToast(`Added ${product.name} to wishlist!`, 'success');
    }
    
    this.saveWishlist();
  }

  hasItem(productId) {
    return this.items.some(item => item.id === productId);
  }

  removeItem(productId) {
    this.items = this.items.filter(item => item.id !== productId);
    this.saveWishlist();
  }

  moveToCart(productId) {
    const item = this.items.find(item => item.id === productId);
    if (item && window.ShoppingCart) {
      window.ShoppingCart.addItem(item);
      this.removeItem(productId);
      this.showToast('Moved to cart!', 'success');
    }
  }

  getItemCount() {
    return this.items.length;
  }

  clearWishlist() {
    this.items = [];
    this.saveWishlist();
  }

  updateWishlistUI() {
    // Update wishlist icon
    const wishlistIcon = document.querySelector('.wishlist-icon');
    if (wishlistIcon) {
      if (this.items.length > 0) {
        wishlistIcon.classList.add('has-items');
      } else {
        wishlistIcon.classList.remove('has-items');
      }
    }

    // Update all wishlist heart buttons
    document.querySelectorAll('[data-wishlist-id]').forEach(btn => {
      const productId = btn.getAttribute('data-wishlist-id');
      const isInWishlist = this.hasItem(productId);
      
      if (isInWishlist) {
        btn.classList.add('in-wishlist');
        btn.innerHTML = '❤️';
      } else {
        btn.classList.remove('in-wishlist');
        btn.innerHTML = '🤍';
      }
    });
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
      border-left: 4px solid ${type === 'success' ? 'var(--success)' : 'var(--accent)'};
    `;
    
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideOutRight 0.3s ease-in';
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  }

  dispatchWishlistUpdate() {
    window.dispatchEvent(new CustomEvent('wishlistUpdated', { 
      detail: { 
        items: this.items, 
        count: this.getItemCount()
      } 
    }));
  }
}

// Initialize wishlist
const wishlist = new Wishlist();

// Export for use in other scripts
if (typeof window !== 'undefined') {
  window.Wishlist = wishlist;
}
