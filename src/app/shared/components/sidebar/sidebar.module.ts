import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {SidebarComponent} from "./sidebar.component";
import {NavbarComponent} from "../navbar/navbar.component";
import {NgbCollapseModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [SidebarComponent, NavbarComponent],
  exports: [
    SidebarComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgbCollapseModule
  ]
})
export class SidebarModule { }
