import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; 
import { ProductResponse, Produit } from './models/produit';

export interface Category {
    slug: string;
    name: string;
    url: string;
}


@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products'; 
    selectedCategorySlug = signal<string | null>(null);
  searchTerm = signal<string>('');
  
  getProduits(category: string | null = null): Observable<ProductResponse> {
    let url = this.apiUrl;

    if (category) {
      url = `${this.apiUrl}/category/${category}`;
    }

    return this.http.get<ProductResponse>(url);
  }
  
  updateSearch(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }
  
  getCategories(): Observable<Category[]> {
    return this.http.get<any[]>(`${this.apiUrl}/categories`).pipe(
        map(data => {
            return data
                .filter(categorySlug => typeof categorySlug === 'string') 
                .map(categorySlug => ({
                    slug: categorySlug,
                    name: this.formatCategoryName(categorySlug),
                    url: `${this.apiUrl}/category/${categorySlug}` 
                } as Category));
        })
    );
  }
  
    private formatCategoryName(slug: string): string {
        if (typeof slug !== 'string') return ''; // Sécurité supplémentaire, bien que non nécessaire après le filtre.
        const parts = slug.split('-');
        return parts.map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
    }
    updateCategoryFilter(slug: string | null) {
    this.selectedCategorySlug.set(slug);
  }
}