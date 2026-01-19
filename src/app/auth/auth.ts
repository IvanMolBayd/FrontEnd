import { Component, inject } from '@angular/core';
import { Auth as FireAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from '@angular/fire/auth';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './auth.html',
  styleUrls: ['./auth.css'],
})
export class Auth {
  private auth = inject(FireAuth);
  private router = inject(Router);
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/auth';

  email = '';
  password = '';
  errorMessage = '';

  async login() {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, this.email, this.password);
      const fbUser = userCredential.user;

      this.http.post<any>('http://localhost:8080/api/auth/sync', {
        firebaseUid: fbUser.uid,
        email: fbUser.email,
        fullName: fbUser.displayName || ""
      }).subscribe({
        next: (dbUser) => {
          console.log("Utilisateur synchronisé avec la DB locale :", dbUser);
          this.router.navigate(['/']);
        },
        error: (err) => console.error("Erreur de synchronisation DB", err)
      });

    } catch (error) {
      alert("Erreur de connexion Firebase");
    }
  }

  async signUp() {
    try {
      await createUserWithEmailAndPassword(this.auth, this.email, this.password);
      alert('Compte créé avec succès !');
      this.router.navigate(['/']); 
    } catch (error: any) {
      this.errorMessage = "Erreur d'inscription : " + error.message;
    }
  }

}
