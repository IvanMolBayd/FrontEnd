import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // <== NOUVEAU : Importez l'opérateur map
import { Produit } from './models/produit';

// Interface Category importée (ou redéfinie) pour la cohérence du service
// (Assurez-vous qu'elle est identique à celle de category-sidebar.ts)
export interface Category {
    slug: string;
    name: string;
    url: string;
}

// ... (vos interfaces ProductResponse, Review, Produit restent inchangées) ...

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products'; 
  searchTerm = signal<string>('');
  
  getProduits(category: string | null = null): Observable<Produit> {
    let url = this.apiUrl;

    if (category) {
      url = `${this.apiUrl}/category/${category}`;
    }

    return this.http.get<Produit>(url);
  }
  
  updateSearch(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }
  
  getCategories(): Observable<Category[]> {
    return this.http.get<string[]>(`${this.apiUrl}/categories`).pipe(
        map(data => {
            return data.map(categorySlug => ({
                slug: categorySlug,
                name: this.formatCategoryName(categorySlug),
                url: `${this.apiUrl}/category/${categorySlug}` 
            } as Category));
        })
    );
  }
  
  private formatCategoryName(slug: string): string {
      const parts = slug.split('-');
      return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
  }
}