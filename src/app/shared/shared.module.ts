import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, NgOptimizedImage} from '@angular/common';
import {CustomCurrencyPipe} from "./pipes/custom-currency-pipe";

@NgModule({
  declarations: [CustomCurrencyPipe],
  imports: [
    CommonModule,
    NgOptimizedImage,
  ],
  exports: [
    CustomCurrencyPipe
  ],
  providers: [
    DatePipe,
    CustomCurrencyPipe
  ]
})
export class SharedModule {
}
