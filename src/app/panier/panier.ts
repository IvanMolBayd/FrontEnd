import { Component, inject } from '@angular/core';
import { PanierService, CartItem } from '../panier-service';
import { CurrencyService } from '../currency-service'; // Pour l'affichage des devises
import { CommonModule } from '@angular/common'; // Pour *ngFor et *ngIf
import { from } from 'rxjs';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './panier.html',
  styleUrls: ['./panier.css']
})
export class PanierComponent {

  public panierService = inject(PanierService);
  public currencyService = inject(CurrencyService);

  cartItems = this.panierService.cartItems;
  cartTotal = this.panierService.cartTotal;
  cartCount = this.panierService.cartCount;

  constructor() { }


  increaseQuantity(item: CartItem): void {
    this.panierService.updateQuantity(item.id, item.quantity + 1);
  }

  decreaseQuantity(item: CartItem): void {
    this.panierService.updateQuantity(item.id, item.quantity - 1);
  }

  removeItem(productId: number): void {
    if (confirm("Êtes-vous sûr de vouloir retirer cet article du panier ?")) {
      this.panierService.removeFromCart(productId);
    }
  }

  clearAll(): void {
    if (confirm("Voulez-vous vraiment vider tout le panier ?")) {
      this.panierService.clearCart();
    }
  }
}