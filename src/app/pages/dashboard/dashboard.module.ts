import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {NgbDropdown, NgbDropdownMenu, NgbDropdownToggle, NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {DashboardComponent} from "./dashboard.component";
import {MatCardModule} from "@angular/material/card";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogModule} from "@angular/material/dialog";
import {NgxSpinnerModule} from "ngx-spinner";
import {LayoutModule} from "../../core/layout/layout.module";
import { NgChartsModule} from "ng2-charts";
import {RouterOutlet} from "@angular/router";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [DashboardComponent],
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
    MatTooltipModule,
    LayoutModule,
    NgbDropdown,
    NgbDropdownMenu,
    NgChartsModule,
    NgbDropdownToggle,
    RouterOutlet
  ]
})
export class DashboardModule { }
