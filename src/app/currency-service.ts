import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  selectedCurrency = signal<string>('USD');

  updateCurrency(currency: string) {
    this.selectedCurrency.set(currency);
  }
}