import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { PanierService } from '../panier-service';
import { CommandeService } from '../commande-service';
import { ToastService } from '../toast-service';
import { Auth } from '@angular/fire/auth';
import { CurrencyService } from '../currency-service';

@Component({
    selector: 'app-checkout',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './checkout.html',
    styleUrls: ['./checkout.css']
})
export class CheckoutComponent {
    panierService = inject(PanierService);
    private commandeService = inject(CommandeService);
    private router = inject(Router);
    private auth = inject(Auth);
    private toastService = inject(ToastService);
    public currencyService = inject(CurrencyService);

    shippingInfo = {
        name: '',
        address: '',
        city: '',
        zip: '',
        cardNumber: ''
    };

    async validateOrder() {
        const user = this.auth.currentUser;
        if (!user) {
            this.toastService.show("Veuillez vous connecter.", "error");
            this.router.navigate(['/auth']);
            return;
        }

        // Validation simple
        if (!this.shippingInfo.name || !this.shippingInfo.address || !this.shippingInfo.cardNumber) {
            this.toastService.show("Veuillez remplir tous les champs.", "warning");
            return;
        }

        try {
            await this.commandeService.createOrder(
                user.uid,
                this.panierService.cartItems(),
                this.panierService.cartTotal()
            );

            this.panierService.clearCart();
            this.toastService.show("Commande validée avec succès !", "success");
            this.router.navigate(['/user']);

        } catch (error) {
            console.error("Erreur commande:", error);
            this.toastService.show("Erreur lors de la commande.", "error");
        }
    }
}
