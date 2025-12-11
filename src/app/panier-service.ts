import { Injectable, signal, computed } from '@angular/core';
import { Produit } from './produit-service'; 

// Interface pour les articles du panier
export interface CartItem extends Produit {
    quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class PanierService {

  cartItems = signal<CartItem[]>([]);
  
  cartCount = computed(() => 
    this.cartItems().reduce((count, item) => count + item.quantity, 0)
  );

  cartTotal = computed(() =>
    this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0)
  );

  constructor() { }

  /**
   * @param product Le produit à ajouter.
   */
  addToCart(product: Produit): void {
    this.cartItems.update(items => {
      const existingItem = items.find(i => i.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        items.push({ ...product, quantity: 1 });
      }

      return [...items];
    });
  }


  getCartTotal(): number {
    return this.cartTotal();
  }


  /**
   * @param productId ID du produit à supprimer.
   */
  removeFromCart(productId: number): void {
    this.cartItems.update(items =>
      items.filter(item => item.id !== productId)
    );
  }

  /**
   * @param productId ID du produit.
   * @param newQuantity Nouvelle quantité.
   */
  updateQuantity(productId: number, newQuantity: number): void {
    if (newQuantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.update(items => {
      const itemToUpdate = items.find(i => i.id === productId);

      if (itemToUpdate) {
        itemToUpdate.quantity = newQuantity;
      }
      return [...items];
    });
  }

  clearCart(): void {
    this.cartItems.set([]);
  }
}