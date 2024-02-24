import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AddFournisseurComponent} from "./add-fournisseur.component";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {LayoutModule} from "../../../core/layout/layout.module";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatOption, MatSelect} from "@angular/material/select";



@NgModule({
  declarations: [AddFournisseurComponent],
  imports: [
    CommonModule,
    MatCardModule,
    LayoutModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    MatSelect,
    MatOption,
  ]
})
export class AddFournisseurModule { }
