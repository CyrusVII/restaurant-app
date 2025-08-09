import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { InfoComponent } from './components/info/info.component';

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
  },
  {
    path: 'menu',
    component: MenuComponent
  },
  {
    path: 'contatti',
    component: InfoComponent
  }


];
