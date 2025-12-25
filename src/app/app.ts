import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { ListProduit } from './list-produit/list-produit';
import { Auth } from './auth/auth';
import { Categories } from './categories/categories';
import { Footer } from './footer/footer';
import { SearchBar } from './search-bar/search-bar';
import { Header } from './header/header';
import { PanierComponent } from './panier/panier';
import { CategorySidebarComponent } from './category-sidebar/category-sidebar';

@Component({
  selector: 'app-root',
  imports: [ListProduit, Auth, Categories, Footer, SearchBar, Header, PanierComponent, CategorySidebarComponent, RouterOutlet, RouterModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('nom-projet');
}
