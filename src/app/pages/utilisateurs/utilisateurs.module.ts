import { NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {ReactiveFormsModule} from "@angular/forms";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {UtilisateursComponent} from "./utilisateurs.component";
import {MatPaginatorModule} from "@angular/material/paginator";
import {LayoutModule} from "../../core/layout/layout.module";
import {AddUtilisateurModule} from "./add-utilisateur/add-utilisateur.module";
import {AddUtilisateurComponent} from "./add-utilisateur/add-utilisateur.component";


const routes: Routes = [
  {
    path: 'add-utilisateur',
    component: AddUtilisateurComponent,
  },
];

@NgModule({
  declarations: [UtilisateursComponent],
    imports: [
        CommonModule,
        MatIconModule,
        AddUtilisateurModule,
        MatButtonModule,
        MatDialogModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes),
        NgbTooltipModule,
        LayoutModule,
        MatPaginatorModule
    ],
  providers: [
  ]
})
export class UtilisateursModule { }
