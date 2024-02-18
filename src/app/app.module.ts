import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
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

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    NgOptimizedImage,
    NgxSpinnerModule.forRoot({ type: 'ball-clip-rotate-pulse' }),
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
    NgxSpinnerModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {}}, { provide: MAT_DIALOG_DATA, useValue: {} },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    { provide: MatPaginatorIntl, useClass: CustomPaginatorIntl },
  ],
  exports: [SharedModule, CoreModule],
  bootstrap: [AppComponent]
})
export class AppModule { }