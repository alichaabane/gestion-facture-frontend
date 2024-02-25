import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from "./shared/shared.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {NgOptimizedImage} from "@angular/common";
import {RouterModule} from "@angular/router";
import {AuthenticationInterceptor} from "./core/interceptors/auth.interceptor";
import {CoreModule} from "./core/core.module";
import {NgxSpinnerModule} from "ngx-spinner";
import {ToastrModule} from "ngx-toastr";
import {MatPaginatorIntl} from "@angular/material/paginator";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {CustomPaginatorIntl} from "./shared/CustomPaginatorIntl";
import {MatPaginatorModule} from '@angular/material/paginator';
import {LayoutModule} from "./core/layout/layout.module";
import {UtilisateursModule} from "./pages/utilisateurs/utilisateurs.module";
import {AddUtilisateurModule} from "./pages/utilisateurs/add-utilisateur/add-utilisateur.module";
import {ProduitsModule} from "./pages/produits/produits.module";
import {AddProduitModule} from "./pages/produits/add-produit/add-produit.module";
import {FournisseursModule} from "./pages/fournisseurs/fournisseurs.module";
import {AddFournisseurModule} from "./pages/fournisseurs/add-fournisseur/add-fournisseur.module";
import {FacturesModule} from "./pages/factures/factures.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatPaginatorModule,
    UtilisateursModule,
    AddUtilisateurModule,
    ProduitsModule,
    AddProduitModule,
    FournisseursModule,
    AddFournisseurModule,
    FacturesModule,
    NgOptimizedImage,
    NgxSpinnerModule.forRoot({type: 'ball-clip-rotate-pulse'}),
    ToastrModule.forRoot({
      timeOut: 3000,
      progressBar: false,
      enableHtml: true,
    }),
    NgbModule,
    RouterModule,
    SharedModule,
    CoreModule,
    AppRoutingModule,
    NgxSpinnerModule,
    LayoutModule
  ],
  providers: [
    {provide: MatDialogRef, useValue: {}}, {provide: MAT_DIALOG_DATA, useValue: {}},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    {provide: MatPaginatorIntl, useClass: CustomPaginatorIntl},
  ],
  exports: [SharedModule, CoreModule],
  bootstrap: [AppComponent]
})
export class AppModule {
}
