import { inject, Injectable } from '@angular/core';
import { getApps, getApp, initializeApp } from 'firebase/app';
import { getAuth, updateCurrentUser } from 'firebase/auth';
import { Auth } from '@angular/fire/auth';
import {
    getFirestore,
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot
} from 'firebase/firestore';
import { Observable } from 'rxjs';
import { Commande } from './models/commande';
import { CartItem } from './panier-service';

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
export class CommandeService {
    private ngAuth = inject(Auth);
    private app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    private db = getFirestore(this.app);

    private async ensureAuthSync() {
        const nativeAuth = getAuth(this.app);
        if (this.ngAuth.currentUser && nativeAuth.currentUser?.uid !== this.ngAuth.currentUser.uid) {
            try {
                await updateCurrentUser(nativeAuth, this.ngAuth.currentUser as any);
            } catch (e) {
                console.error('CommandeService: Auth Sync Failed', e);
            }
        }
    }

    async createOrder(userId: string, items: CartItem[], total: number) {
        await this.ensureAuthSync();
        const commandesRef = collection(this.db, 'commandes');

        const newOrder: Commande = {
            userId,
            items,
            total,
            date: new Date(),
            status: 'confirmée'
        };

        return addDoc(commandesRef, newOrder);
    }

    getOrdersByUser(userId: string): Observable<Commande[]> {
        // Trigger sync (async) but don't block observable creation
        this.ensureAuthSync();

        const commandesRef = collection(this.db, 'commandes');
        const q = query(
            commandesRef,
            where('userId', '==', userId),
            orderBy('date', 'desc')
        );

        return new Observable((observer) => {
            const unsubscribe = onSnapshot(q, (snapshot) => {
                const orders = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                })) as unknown as Commande[];
                observer.next(orders);
            }, (error) => {
                observer.error(error);
            });
            return unsubscribe;
        });
    }
}
