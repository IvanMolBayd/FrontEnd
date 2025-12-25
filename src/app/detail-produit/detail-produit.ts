import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProduitService } from '../produit-service';
import { Produit } from '../models/produit';
import { CommonModule } from '@angular/common'; // Très important
import { CurrencyService } from '../currency-service';
import { PanierService } from '../panier-service';

@Component({
  selector: 'app-detail-produit', // Change bien ce nom ici
  standalone: true,
  imports: [CommonModule, RouterModule], 
  templateUrl: './detail-produit.html',
  styleUrls: ['./detail-produit.css']
})
export class DetailProduit implements OnInit {
  private route = inject(ActivatedRoute);
  private produitService = inject(ProduitService);
  public currencyService = inject(CurrencyService); 
  private panierService = inject(PanierService);     
  private cdr = inject(ChangeDetectorRef);
  produit: Produit | null = null; // Initialisé à null

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.produitService.getProduitById(+id).subscribe({
          next: (res) => {
            this.produit = res;
            this.cdr.detectChanges(); // <--- FORCE la mise à jour du HTML
          }
        });
      }
    });
  }

  addProduitToCart(product: Produit): void {
    this.panierService.addToCart(product);
  }
}