import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produit, ProductResponse } from '../models/produit';
import { ProduitService } from '../produit-service';
import { CurrencyService } from '../currency-service';
import { PanierService } from '../panier-service';
import { CategorySidebarComponent } from '../category-sidebar/category-sidebar';


@Component({
  selector: 'app-list-produit',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './list-produit.html',
  styleUrls: ['./list-produit.css'],
})

export class ListProduit implements OnInit {
  
  // Injection des services
  public currencyService = inject(CurrencyService);
  private produitService = inject(ProduitService);
  private panierService = inject(PanierService);
  
  produitList = signal<Produit[]>([]);
  
  private categorySlug = this.produitService.selectedCategorySlug;

  currentCategory: string | null = null; 

  get filteredList(): Produit[] {
      const term = (this.produitService.searchTerm() || '').toLowerCase();

      if (!term) {
        return this.produitList();
      }

      return this.produitList().filter(p => { 
        
        const title = (p.title || '').toLowerCase();
        const description = (p.description || '').toLowerCase();

        return title.includes(term) || description.includes(term);
      });
    }

  constructor() {
    effect(() => {
        const slug = this.categorySlug();
        console.log(`[ListProduit] Déclenchement du chargement pour le slug : ${slug}`);
        this.loadProduits(slug);
    });
  }

  ngOnInit(): void {
  }

  addProduitToCart(product: Produit): void {
    this.panierService.addToCart(product);
    console.log(`Produit ajouté au panier: ${product.title}`);
  }


  loadProduits(category: string | null) {
      this.currentCategory = category; 
      
      this.produitService.getProduits(category).subscribe({ 
         next: (response: ProductResponse) => {
            this.produitList.set(response.products);
            console.log(`Produits chargés pour ${category || 'toutes les catégories'} :`, this.produitList());
         },
         error: (error) => {
            console.error('Erreur lors du chargement des produits:', error);
            this.produitList.set([]);
         }
      });
   }
}