import { Injectable, signal, computed, inject } from '@angular/core';
import { Produit } from './models/produit';
import { ToastService } from './toast-service';

// Interface pour les articles du panier
export interface CartItem extends Produit {
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class PanierService {
  private toastService = inject(ToastService);

  cartItems = signal<CartItem[]>([]);

  cartCount = computed(() =>
    this.cartItems().reduce((count, item) => count + item.quantity, 0)
  );

  cartTotal = computed(() =>
    this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0)
  );

  constructor() { }

  /**
   * @param product 
   */
  addToCart(product: Produit): void {
    this.cartItems.update(items => {
      const existingItem = items.find(i => i.id === product.id);

      if (existingItem) {
        // Retourne une nouvelle liste avec l'item mis à jour (copie immuable)
        return items.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      // Retourne une nouvelle liste avec le nouvel item
      return [...items, { ...product, quantity: 1 }];
    });

    this.toastService.show(`${product.title} ajouté au panier !`, 'success');
  }


  getCartTotal(): number {
    return this.cartTotal();
  }


  /**
   * @param productId
   */
  removeFromCart(productId: number): void {
    this.cartItems.update(items =>
      items.filter(item => item.id !== productId)
    );
  }

  /**
   * @param productId
   * @param newQuantity
   */
  updateQuantity(productId: number, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.update(items =>
      items.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  }

  clearCart(): void {
    this.cartItems.set([]);
  }

  // Utilisation directe du signal computed pour éviter les confusions
  getTotalItems() {
    return this.cartCount();
  }
}