import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideAuth, getAuth } from '@angular/fire/auth';


const firebaseConfig = {
  apiKey: "AIzaSyBbSahVtwJ2-gGe5BZXb4UKMHbMLXGDnhA",
  authDomain: "frontend-c2686.firebaseapp.com",
  projectId: "frontend-c2686",
  storageBucket: "frontend-c2686.firebasestorage.app",
  messagingSenderId: "1097262625770",
  appId: "1:1097262625770:web:01b1bff2cf886542f8b893",
  measurementId: "G-WQ888BLFVN"
};



export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(), 
    provideHttpClient(),
    provideRouter(routes), 
    //provideClientHydration(withEventReplay()),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth())
  ]
};
