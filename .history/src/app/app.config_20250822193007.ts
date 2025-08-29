import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideToastr } from 'ngx-toastr';
import { provideSpinnerConfig } from 'ngx-spinner';


import { routes } from './app.routes';
import { environment } from '../environments/environment';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(environment)),
    provideSpinnerConfig({ type: "ball-fussion" }),
    provideFirestore(() => getFirestore()),
    provideToastr(),
    provideAnimations(),
    provideHttpClient(),
    provideAuth(() => getAuth()),
  ]
};

