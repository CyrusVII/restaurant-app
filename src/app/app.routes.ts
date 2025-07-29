import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  // Define your routes
  {
    path: '',
    pathMatch: 'full',// Redirect to home on empty path
    redirectTo: 'home',
  },
  {
    path: 'home',
    component: HomeComponent
  }

];
