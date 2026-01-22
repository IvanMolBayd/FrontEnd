import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Auth, user } from '@angular/fire/auth';
import { CommandeService } from '../commande-service';
import { Commande } from '../models/commande';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { CurrencyService } from '../currency-service';

@Component({
    selector: 'app-user',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './user.html',
    styleUrls: ['./user.css']
})
export class UserComponent implements OnInit {
    private auth = inject(Auth);
    private commandeService = inject(CommandeService);
    public currencyService = inject(CurrencyService);

    user$ = user(this.auth);
    orders$: Observable<Commande[]> = of([]);

    ngOnInit() {
        this.orders$ = this.user$.pipe(
            switchMap(user => {
                if (user) {
                    return this.commandeService.getOrdersByUser(user.uid);
                } else {
                    return of([]);
                }
            })
        );
    }
}
