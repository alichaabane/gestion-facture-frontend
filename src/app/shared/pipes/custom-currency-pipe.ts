import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'customCurrency' })
export class CustomCurrencyPipe implements PipeTransform {
  transform(value: number | null): string | null {
    if (value === null || isNaN(value)) return null;

    const formattedPrice = value.toLocaleString('de-DE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return formattedPrice.replace('.', ',');
  }
}
