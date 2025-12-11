import { Component, inject } from '@angular/core';
import { CurrencyService } from '../currency-service';
@Component({
  selector: 'app-header',
  imports: [],
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
