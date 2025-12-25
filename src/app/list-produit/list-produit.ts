import { Component, OnInit, inject, signal, computed, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Produit, ProductResponse } from '../models/produit';
import { ProduitService } from '../produit-service';
import { CurrencyService } from '../currency-service';
import { PanierService } from '../panier-service';
import { CategorySidebarComponent } from '../category-sidebar/category-sidebar';
import { RouterModule } from '@angular/router';
import { Categories } from '../categories/categories';

@Component({
  selector: 'app-list-produit',
  standalone: true,
  imports: [CommonModule, CategorySidebarComponent, RouterModule, Categories], 
  templateUrl: './list-produit.html',
  styleUrls: ['./list-produit.css'],
})

export class ListProduit implements OnInit {
  
  // Injection des services
  public currencyService = inject(CurrencyService);
  private produitService = inject(ProduitService);
  private panierService = inject(PanierService);
  private categorySlug = this.produitService.selectedCategorySlug;
  produitList = signal<Produit[]>([]);
  currentCategory: string | null = null;

  filteredList = computed(() => {
    const term = (this.produitService.searchTerm() || '').toLowerCase();
    const currentList = this.produitList();

    if (!term) {
      return currentList;
    }

    return currentList.filter(p => 
      (p.title || '').toLowerCase().includes(term) || 
      (p.description || '').toLowerCase().includes(term)
    );
  });

  constructor() {
    effect(() => {
        const slug = this.categorySlug();
        console.log(`[ListProduit] Déclenchement du chargement pour le slug : ${slug}`);
        this.loadProduits(slug);
    });
  }

  ngOnInit() {
      this.produitService.getProduits().subscribe(res => {
      this.produitList.set(res.products);
    });
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