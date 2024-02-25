import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxSpinnerModule} from "ngx-spinner";
import {FacturesComponent} from "./factures.component";
import {LayoutModule} from "../../core/layout/layout.module";
import {MatPaginator} from "@angular/material/paginator";



@NgModule({
  declarations: [FacturesComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgxSpinnerModule,
    MatPaginator,
    LayoutModule
  ]
})
export class FacturesModule { }
