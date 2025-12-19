import { Routes } from '@angular/router';
import { ListProduit } from './list-produit/list-produit'; 
import { PanierComponent } from './panier/panier'; 

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
    path: '**',
    redirectTo: '', 
    pathMatch: 'full' 
  }
];