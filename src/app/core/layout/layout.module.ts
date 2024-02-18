import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LayoutComponent} from "./layout.component";
import {RouterModule} from "@angular/router";
import {MatIconModule} from "@angular/material/icon";
import {NgbTooltipModule} from "@ng-bootstrap/ng-bootstrap";
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatButtonModule} from "@angular/material/button";
import {ReactiveFormsModule} from "@angular/forms";
import {SidebarModule} from "../../shared/components/sidebar/sidebar.module";


@NgModule({
  declarations: [LayoutComponent],
  exports: [
    LayoutComponent
  ],
  imports: [
    RouterModule,
    MatIconModule,
    CommonModule,
    NgbTooltipModule,
    MatPaginatorModule,
    SidebarModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  providers: [
  ]
})
export class LayoutModule { }
