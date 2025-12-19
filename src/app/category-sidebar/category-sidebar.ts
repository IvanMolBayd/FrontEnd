import { Component, Output, EventEmitter, OnInit, inject } from '@angular/core';
import { ProduitService } from '../produit-service';
import { CommonModule } from '@angular/common';

export interface Category {
    slug: string;
    name: string;
    url: string;
}

@Component({
  standalone: true,
  imports: [CommonModule], 
  selector: 'app-category-sidebar',
  templateUrl: './category-sidebar.html',
  styleUrls: ['./category-sidebar.css']
})
export class CategorySidebarComponent implements OnInit {
  private produitService = inject(ProduitService);
  categories: Category[] = []; 
  selectedCategorySlug = this.produitService.selectedCategorySlug;  
  @Output() categorySelected = new EventEmitter<string | null>(); 

  constructor() { }

ngOnInit(): void {
  this.produitService.getCategories().subscribe({
    next: (data: Category[]) => {
      this.categories = data; 
    },
    error: (err) => {
      console.error("Erreur lors de la récupération des catégories :", err); 
    }
  });
}

  selectCategory(category: Category | null): void {
    const filterValue = category ? category.slug : null;
    this.produitService.updateCategoryFilter(filterValue);
  }
}