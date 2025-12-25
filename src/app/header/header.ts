import { Component, inject } from '@angular/core';
import { CurrencyService } from '../currency-service';
import { SearchBar } from '../search-bar/search-bar';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PanierService } from '../panier-service';
@Component({
  selector: 'app-header',
  imports: [SearchBar, CommonModule, RouterModule,],
  templateUrl: './header.html',
  styleUrl: './header.css',
  standalone: true,
})
export class Header {
  public panierService = inject(PanierService);
  private currencyService = inject(CurrencyService);

  onCurrencyChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.currencyService.updateCurrency(selectElement.value);
  }
}
