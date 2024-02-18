import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ProduitsComponent} from "./pages/produits/produits.component";
import {UtilisateursComponent} from "./pages/utilisateurs/utilisateurs.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'produits', // Redirect to 'produits'
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'register',
    component: RegisterComponent,
    loadChildren: () =>
      import('./pages/register/register.module').then((m) => m.RegisterModule),
  },
  {
    path: 'produits',
    component: ProduitsComponent,
    loadChildren: () =>
      import('./pages/produits/produits.module').then((m) => m.ProduitsModule),
  },
  {
    path: 'utilisateurs',
    component: UtilisateursComponent,
    loadChildren: () =>
      import('./pages/utilisateurs/utilisateurs.module').then((m) => m.UtilisateursModule),
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    loadChildren: () =>
      import('./pages/dashboard/dashboard.module').then((m) => m.DashboardModule),
  },
  {
    path: '**',
    redirectTo: 'login', // Redirect any unmatched route to '/login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
