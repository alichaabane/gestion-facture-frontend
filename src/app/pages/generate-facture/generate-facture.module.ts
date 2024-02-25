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
import {GenerateFactureComponent} from "./generate-facture.component";
import {LayoutModule} from "../../core/layout/layout.module";
import {MatPaginator, MatPaginatorModule} from "@angular/material/paginator";
import {
  MatCell, MatCellDef, MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow, MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable
} from "@angular/material/table";
import {MatCheckbox} from "@angular/material/checkbox";



@NgModule({
  declarations: [GenerateFactureComponent],
  imports: [
    CommonModule,
    MatCardModule,
    FormsModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    ReactiveFormsModule,
    NgbTooltipModule,
    NgxSpinnerModule,
    MatPaginator,
    LayoutModule,
    MatTable,
    MatHeaderCell,
    MatCheckbox,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatHeaderCellDef,
    MatRowDef,
    MatColumnDef,
    MatCellDef,
    MatHeaderRowDef
  ]
})
export class GenerateFactureModule { }
