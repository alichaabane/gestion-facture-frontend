import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ProduitsComponent} from "./pages/produits/produits.component";
import {UtilisateursComponent} from "./pages/utilisateurs/utilisateurs.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {AddUtilisateurComponent} from "./pages/utilisateurs/add-utilisateur/add-utilisateur.component";

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
    canActivate: [AuthGuard], // Apply the guard to this route
    component: ProduitsComponent,
    loadChildren: () =>
      import('./pages/produits/produits.module').then((m) => m.ProduitsModule),
  },
  {
    path: 'utilisateurs',
    canActivate: [AuthGuard], // Apply the guard to this route
    component: UtilisateursComponent, // Ensure this component is correctly imported
  },
  {
    path: 'add-utilisateur',
    canActivate: [AuthGuard], // Apply the guard to this route
    component: AddUtilisateurComponent,
    data: { editMode: false }, // Add this data property to indicate "add" mode
  },
  {
    path: 'edit-utilisateur/:id', // Use a parameter for the Utilisateur ID
    canActivate: [AuthGuard], // Apply the guard to this route
    component: AddUtilisateurComponent,
    data: { editMode: true }, // Add this data property to indicate "edit" mode
  },
// Add other routes for 'utilisateurs' here if needed

  {
    path: 'dashboard',
    canActivate: [AuthGuard], // Apply the guard to this route
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
