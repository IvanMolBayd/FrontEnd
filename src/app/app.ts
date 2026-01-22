import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Footer } from './footer/footer';
import { Header } from './header/header';
import { ToastComponent } from './components/toast.component';

@Component({
  selector: 'app-root',
  imports: [Footer, Header, RouterOutlet, RouterModule, ToastComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  protected readonly title = signal('nom-projet');
}
