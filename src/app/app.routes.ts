import { Routes } from '@angular/router';
import { ListProduit } from './list-produit/list-produit';
import { PanierComponent } from './panier/panier';
import { Auth } from './auth/auth';
import { DetailProduit } from './detail-produit/detail-produit';
import { UserComponent } from './user/user';
import { CheckoutComponent } from './checkout/checkout';

export const routes: Routes = [
  {
    path: '',
    component: ListProduit,
    title: 'EMI Shop | Accueil'
  },
  {
    path: 'panier',
    component: PanierComponent,
    title: 'EMI Shop | Panier'
  },

  {
    path: 'auth',
    component: Auth,
    title: 'EMI Shop | Authentification'
  },

  {
    path: 'user',
    component: UserComponent,
    title: 'EMI Shop | Mon Profil'
  },

  {
    path: 'checkout',
    component: CheckoutComponent,
    title: 'EMI Shop | Livraison'
  },
  {
    path: 'produit/:id',
    component: DetailProduit,
    title: 'EMI Shop | Détail',
    data: { renderMode: 'client' }
  },


  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  },


];