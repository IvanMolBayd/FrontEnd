import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { ProduitService } from '../produit-service';
import { CommonModule } from '@angular/common';

// Interface pour les objets catégorie réels de l'API
export interface Category {
    slug: string;
    name: string;
    url: string;
}

@Component({
  standalone: true, // IMPORTANT: Nécessaire pour l'utiliser dans ListProduit
  imports: [CommonModule], // IMPORTANT: Nécessaire pour *ngFor
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.html',
  styleUrls: ['./category-sidebar.css']
})
export class CategorySidebarComponent implements OnInit {
  private produitService = inject(ProduitService);

  // Typage correct
  categories: Category[] = []; 
  selectedCategory: Category | null = null;
  
  // Émet une CHÂINE (slug) ou null
  @Output() categorySelected = new EventEmitter<string | null>(); 

  constructor() { }

  ngOnInit(): void {
    this.produitService.getCategories().subscribe({ // <== LIGNE D'ERREUR (34:6)
      next: (data: Category[]) => { // <== VOUS AVEZ TYPÉ data comme Category[]
        this.categories = data;
      },
      error: (err) => {
        console.error("Erreur lors de la récupération des catégories :", err);
      }
    });
  }

  selectCategory(category: Category | null): void {
    this.selectedCategory = category;
    
    // Émet le SLUG pour que le parent puisse filtrer via l'API
    const filterValue = category ? category.slug : null;
    this.categorySelected.emit(filterValue);
  }
}