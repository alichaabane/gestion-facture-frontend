import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ResetPasswordComponent} from "./reset-password.component";
import {MatCardModule} from "@angular/material/card";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatDialogModule} from "@angular/material/dialog";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {NgxSpinnerModule} from "ngx-spinner";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [ResetPasswordComponent],
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
    RouterLink
  ]
})

export class ResetPasswordModule { }
