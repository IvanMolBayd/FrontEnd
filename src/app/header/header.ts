import { Component, inject , OnInit} from '@angular/core';
import { CurrencyService } from '../currency-service';
import { SearchBar } from '../search-bar/search-bar';
import { CommonModule } from '@angular/common';
import { Router,  RouterModule } from '@angular/router';
import { PanierService } from '../panier-service';
import { Auth ,user, User , signOut} from '@angular/fire/auth';
import { Subscription } from 'rxjs';
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
  private auth = inject(Auth);
  private router = inject(Router);
  
  currentUser: User | null = null;
  userSubscription!: Subscription

  ngOnInit() {
    this.userSubscription = user(this.auth).subscribe((user) => {
      this.currentUser = user;
    });
  }

  goToLogin() {
    this.router.navigate(['/auth']);
  }

  async logout() {
    signOut(this.auth).then(() => {
      this.router.navigate(['/']);
    });

  }

  ngOnDestroy() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  onCurrencyChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.currencyService.updateCurrency(selectElement.value);
  }
}
