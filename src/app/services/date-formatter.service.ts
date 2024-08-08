import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DateFormatterService {

  constructor() { }

  formatDate(date: Date)
  {
    let format = `${date.getFullYear()}`

    format += `-${(date.getMonth() + 1 < 10 ? 0 : '')}` + `${date.getMonth() + 1}`;
    format += `-${(date.getDate() + 1 < 10 ? 0 : '')}` + `${date.getDate()}`;

    return format;
  }

  convertToAccordDate(dateString: string): Date
  {
    return new Date(dateString.replace(/-/g, '\/'));
  }

  isDate(checkDate: string)
  {
    let date = Date.parse(checkDate);

    if (isNaN(date))
      return false;
    else
      return true;
  }

  validateFieldDate(date: Date | string | DateConstructor): boolean
  {
    if (!(date instanceof Date) && !(typeof date == 'string'))
        return false;
  
      if (typeof date === 'string' && !this.isDate(date))
        return false;

      return true;
  }
}
