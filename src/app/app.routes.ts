import { Routes } from '@angular/router';
import { ListProduit } from './list-produit/list-produit'; 
import { PanierComponent } from './panier/panier'; 
import { Auth } from './auth/auth';
import { DetailProduit } from './detail-produit/detail-produit';

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
    path: 'produit/:id',
    component: DetailProduit,
    title: 'EMI Shop | Détail'
  },

  { 
    path: '**',
    redirectTo: '', 
    pathMatch: 'full' 
  },


];