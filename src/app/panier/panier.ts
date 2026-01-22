import { Component, inject } from '@angular/core';
import { PanierService, CartItem } from '../panier-service';
import { CurrencyService } from '../currency-service';
import { CommonModule } from '@angular/common';
import { Auth } from '@angular/fire/auth';
import { Router, RouterModule } from '@angular/router';
import { CommandeService } from '../commande-service';

@Component({
  selector: 'app-panier',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './panier.html',
  styleUrls: ['./panier.css']
})
export class PanierComponent {

  public panierService = inject(PanierService);
  public currencyService = inject(CurrencyService);
  private auth = inject(Auth);
  private router = inject(Router);
  private commandeService = inject(CommandeService);

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

  goToCheckout() {
    console.log("Navigating to checkout...");
    this.router.navigate(['/checkout']).then(res => {
      console.log("Navigation result:", res);
    }).catch(err => {
      console.error("Navigation error:", err);
      alert("Rouge Erreur: " + err);
    });
  }

  async confirmOrder() {
    const user = this.auth.currentUser;
    if (!user) {
      alert("Vous devez être connecté pour passer une commande.");
      this.router.navigate(['/auth']);
      return;
    }

    if (this.cartItems().length === 0) return;

    if (confirm("Confirmer la commande ?")) {
      try {
        await this.commandeService.createOrder(user.uid, this.cartItems(), this.cartTotal());

        alert("Commande confirmée avec succès !");
        this.panierService.clearCart();
        this.router.navigate(['/user']);

      } catch (error) {
        console.error("Erreur commande", error);
        alert("Une erreur est survenue lors de la commande.");
      }
    }
  }
}