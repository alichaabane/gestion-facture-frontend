import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {RegisterComponent} from "./pages/register/register.component";
import {ProduitsComponent} from "./pages/produits/produits.component";
import {UtilisateursComponent} from "./pages/utilisateurs/utilisateurs.component";
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {AuthGuard} from "./core/guards/auth.guard";
import {AddUtilisateurComponent} from "./pages/utilisateurs/add-utilisateur/add-utilisateur.component";
import {AddProduitComponent} from "./pages/produits/add-produit/add-produit.component";
import {FournisseursComponent} from "./pages/fournisseurs/fournisseurs.component";
import {AddFournisseurComponent} from "./pages/fournisseurs/add-fournisseur/add-fournisseur.component";
import {FacturesComponent} from "./pages/factures/factures.component";
import {GenerateFactureComponent} from "./pages/generate-facture/generate-facture.component";
import {ForgetPasswordComponent} from "./pages/forget-password/forget-password.component";
import {ResetPasswordComponent} from "./pages/reset-password/reset-password.component";

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard', // Redirect to 'dashboard'
  },
  {
    path: 'login',
    component: LoginComponent,
    loadChildren: () =>
      import('./pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'reset-password/:token',
    component: ResetPasswordComponent,
    loadChildren: () =>
      import('./pages/reset-password/reset-password.module').then((m) => m.ResetPasswordModule),
  },
  {
    path: 'forget-password',
    component: ForgetPasswordComponent,
    loadChildren: () =>
      import('./pages/forget-password/forget-password.module').then((m) => m.ForgetPasswordModule),
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
    component: ProduitsComponent
  },
  {
    path: 'add-produit',
    canActivate: [AuthGuard], // Apply the guard to this route
    component: AddProduitComponent,
    data: { editMode: false }, // Add this data property to indicate "add" mode
  },
  {
    path: 'fournisseurs',
    canActivate: [AuthGuard], // Apply the guard to this route
    component: FournisseursComponent
  },
  {
    path: 'add-fournisseur',
    canActivate: [AuthGuard], // Apply the guard to this route
    component: AddFournisseurComponent,
    data: { editMode: false }, // Add this data property to indicate "add" mode
  },
  {
    path: 'factures',
    canActivate: [AuthGuard], // Apply the guard to this route
    component: FacturesComponent
  },  {
    path: 'generate-facture',
    canActivate: [AuthGuard], // Apply the guard to this route
    component: GenerateFactureComponent
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
