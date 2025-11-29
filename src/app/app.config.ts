import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { Addtask } from './pages/addtask/addtask';
import { Tasklist } from './pages/tasklist/tasklist';
import { Home } from './pages/home/home';
import { Signup } from './pages/signup/signup';
import { authGuard } from './auth-guard';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: Home },
  { path: 'addtask', component: Addtask, canActivate: [authGuard] },
  { path: 'tasklist', component: Tasklist },
  { path: 'signup', component: Signup },
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
  ]
};
