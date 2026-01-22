import { inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
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
  maxPrice = signal<number>(10000);



  getProduits(category: string | null = null): Observable<ProductResponse> {
    let url = this.apiUrl;

    if (category) {
      url = `${this.apiUrl}/category/${category}`;
    }

    return this.http.get<ProductResponse>(url).pipe(
      catchError(err => {
        console.error('Error fetching products', err);
        // Retourner un objet vide conforme à l'interface pour ne pas crash
        return of({ products: [], total: 0, skip: 0, limit: 0 });
      })
    );
  }

  getProduitById(id: number) {
    return this.http.get<Produit>(`${this.apiUrl}/${id}`).pipe(
      catchError(err => {
        console.error(`Error fetching product ${id}`, err);
        return of(null); // Ou gérer autrement
      })
    );
  }


  updateSearch(searchTerm: string) {
    this.searchTerm.set(searchTerm);
  }

  updatePrice(price: number) {
    this.maxPrice.set(price);
  }

  getCategories(): Observable<Category[]> {
    return this.http.get<any[]>(`${this.apiUrl}/category-list`).pipe(
      map(data => {
        return data
          .filter(categorySlug => typeof categorySlug === 'string')
          .map(categorySlug => ({
            slug: categorySlug,
            name: this.formatCategoryName(categorySlug),
            url: `${this.apiUrl}/category/${categorySlug}`
          } as Category));
      }),
      catchError(err => {
        console.error('Error fetching categories', err);
        return of([]);
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