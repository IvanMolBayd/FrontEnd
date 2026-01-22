import { Component, inject, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ProduitService } from '../produit-service';
import { Produit } from '../models/produit';
import { CommonModule } from '@angular/common'; // Très important
import { CurrencyService } from '../currency-service';
import { PanierService } from '../panier-service';
import { CommentaireService } from '../commentaire-service';
import { ToastService } from '../toast-service';
import { Auth, user } from '@angular/fire/auth';
import { Review } from '../models/produit';
import { Observable, of } from 'rxjs';
import { switchMap, tap, catchError, map } from 'rxjs/operators';


@Component({
  selector: 'app-detail-produit', // Change bien ce nom ici
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './detail-produit.html',
  styleUrls: ['./detail-produit.css']
})
export class DetailProduit implements OnInit {
  private route = inject(ActivatedRoute);
  private produitService = inject(ProduitService);
  public currencyService = inject(CurrencyService);
  private panierService = inject(PanierService);
  private commentaireService = inject(CommentaireService);
  public auth = inject(Auth)
  private cdr = inject(ChangeDetectorRef);
  private toastService = inject(ToastService);

  produit: Produit | null = null;
  reviews$: Observable<Review[]> = of([]); // Observable pour les avis
  averageRating$: Observable<number> = of(0);
  user$ = user(this.auth);
  showSuccessMsg = false;
  selectedRating = 5;
  stars = [1, 2, 3, 4, 5];

  setRating(star: number) {
    this.selectedRating = star;
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        const productId = +id;

        // 1. Charger le produit (DummyJSON)
        this.produitService.getProduitById(productId).subscribe(res => {
          this.produit = res;
          this.cdr.detectChanges();
        });

        // 2. Charger les commentaires Firebase via AsyncPipe et fusionner avec DummyJSON
        this.reviews$ = this.commentaireService.getCommentsByProductId(productId).pipe(
          map(firebaseReviews => {
            const dummyReviews = this.produit?.reviews || [];
            // Fusion: Firebase en premier (plus récents), puis DummyJSON
            return [...firebaseReviews, ...dummyReviews];
          }),
          tap(allReviews => console.log("✅ Commentaires fusionnés (Firebase + DummyJSON) :", allReviews.length)),
          catchError(err => {
            console.error("❌ Erreur chargement commentaires :", err);
            // En cas d'erreur Firebase, on retourne au moins les avis DummyJSON
            return of(this.produit?.reviews || []);
          })
        );

        // 3. Calculer la moyenne globale (Firebase + DummyJSON)
        this.averageRating$ = this.reviews$.pipe(
          map(reviews => {
            if (!reviews || reviews.length === 0) return 0;
            const total = reviews.reduce((acc, review) => acc + (review.rating || 0), 0);
            return total / reviews.length;
          })
        );
      }
    });
  }

  addProduitToCart(product: Produit): void {
    this.panierService.addToCart(product);
  }

  async postComment(commentInput: HTMLTextAreaElement, rating: number) {
    const commentText = commentInput.value;
    const currentUser = this.auth.currentUser;
    if (!currentUser || !this.produit || !commentText.trim()) return;

    const newReview: Review = {
      rating: rating,
      comment: commentText,
      date: new Date(),
      reviewerName: currentUser.displayName || currentUser.email || 'Anonyme',
      reviewerEmail: currentUser.email || ''
    };

    try {
      await this.commentaireService.addComment(this.produit.id, newReview);

      this.toastService.show('Votre avis a été ajouté !', 'success');
      commentInput.value = ''; // Reset input
      this.selectedRating = 5; // Reset stars

    } catch (error) {
      console.error("Erreur lors de l'ajout du commentaire :", error);
      this.toastService.show("Impossible d'ajouter le commentaire.", 'error');
    }
  }

}