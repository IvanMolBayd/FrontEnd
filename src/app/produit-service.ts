import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface ProductResponse {
  products: Produit[];
  total: number;
  skip: number;
  limit: number;
}

export interface Review {
    rating: number;
    comment: string;
    date: Date;
    reviewerName: string;
    reviewerEmail: string;
}


export interface Produit {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    rating?: number;
    stock: number;
    brand: string;
    availabilityStatus?: boolean;
    reviews?: Review[]; 
    images: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ProduitService {
  private http = inject(HttpClient);
  private apiUrl = 'https://dummyjson.com/products'; 
  getProduits(): Observable<ProductResponse> {
    return this.http.get<ProductResponse>(this.apiUrl);
  }
}