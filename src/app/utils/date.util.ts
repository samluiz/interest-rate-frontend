import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DateUtil {
  monthPrefixes: Array<string> = [
    '',
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ];

  convertMonthYear(month: number, year: number): string {
    return `${this.monthPrefixes[month]}-${year}`;
  }

  getMonthNumber(monthPrefix: string): number {
    return this.monthPrefixes.indexOf(monthPrefix);
  }

  convertYearMonth(month: number, year: number): string {
    let anoMes: string;
    if (month.toString().length < 2) {
      anoMes = `${year}-0${month}`;
    } else {
      anoMes = `${year}-${month}`;
    }
    return anoMes;
  }
}
