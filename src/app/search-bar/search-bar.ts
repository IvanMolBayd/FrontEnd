import { Component, inject } from '@angular/core';
import { ProduitService } from '../produit-service';

@Component({
  selector: 'app-search-bar',
  imports: [],
  templateUrl: './search-bar.html',
  styleUrl: './search-bar.css',
})
export class SearchBar {
  private produitService = inject(ProduitService);

  onSearch(term: string) {
    console.log('Recherche:', term); 
    this.produitService.updateSearch(term);
  }
}
