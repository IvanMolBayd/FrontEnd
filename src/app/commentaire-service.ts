import { inject, Injectable } from '@angular/core';
import { getApps, getApp, initializeApp } from 'firebase/app';
import { getAuth, updateCurrentUser } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import {
  getFirestore,
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Review } from './models/produit';

const firebaseConfig = {
  apiKey: "AIzaSyBbSahVtwJ2-gGe5BZXb4UKMHbMLXGDnhA",
  authDomain: "frontend-c2686.firebaseapp.com",
  projectId: "frontend-c2686",
  storageBucket: "frontend-c2686.firebasestorage.app",
  messagingSenderId: "1097262625770",
  appId: "1:1097262625770:web:01b1bff2cf886542f8b893",
  measurementId: "G-WQ888BLFVN"
};

@Injectable({
  providedIn: 'root'
})
export class CommentaireService {
  private ngAuth = inject(Auth);
  private app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
  private db = getFirestore(this.app);

  private async ensureAuthSync() {
    const nativeAuth = getAuth(this.app);
    if (this.ngAuth.currentUser && nativeAuth.currentUser?.uid !== this.ngAuth.currentUser.uid) {
      try {
        await updateCurrentUser(nativeAuth, this.ngAuth.currentUser as any);
      } catch (e) {
        console.error('CommentaireService: Auth Sync Failed', e);
      }
    }
  }

  getCommentsByProductId(productId: number): Observable<Review[]> {
    const commentsRef = collection(
      this.db,
      'produits',
      productId.toString(),
      'commentaires'
    );

    const q = query(commentsRef, orderBy('date', 'desc'));

    return new Observable((observer) => {
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const reviews = snapshot.docs.map(doc => ({
          ...doc.data(),
          firebaseId: doc.id
        })) as unknown as Review[];
        observer.next(reviews);
      }, (error) => {
        observer.error(error);
      });
      return unsubscribe;
    });
  }

  async addComment(productId: number, review: Review) {
    await this.ensureAuthSync();

    const commentsRef = collection(
      this.db,
      'produits',
      productId.toString(),
      'commentaires'
    );

    // On utilise Date JS standard, Firestore le convertit automatiquement
    const dataToAdd = {
      ...review,
      date: new Date()
    };

    return addDoc(commentsRef, dataToAdd);
  }
}