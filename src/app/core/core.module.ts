import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import {RouterModule} from "@angular/router";
import {UserService} from "./services/http/user.service";
import {ProduitService} from "./services/http/produit.service";

@NgModule({
  declarations: [],
  imports: [
    RouterModule,
    CommonModule,
    SharedModule
  ],
  exports: [],
  providers: [UserService, ProduitService]
})
export class CoreModule { }
