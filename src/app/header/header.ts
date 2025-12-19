import { Component, inject } from '@angular/core';
import { CurrencyService } from '../currency-service';
import { SearchBar } from '../search-bar/search-bar';
@Component({
  selector: 'app-header',
  imports: [SearchBar],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private currencyService = inject(CurrencyService);

  onCurrencyChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.currencyService.updateCurrency(selectElement.value);
  }
}
