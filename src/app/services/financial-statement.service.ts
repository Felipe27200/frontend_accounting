import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { LocalStorageService } from './local-storage.service';
import { FormStatement } from 'app/financial-statement/FormStatement';

@Injectable({
  providedIn: 'root'
})
export class FinancialStatementService {

  apiUrl = 'api/financial-statement';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  createFinancialStatement(formData: FormStatement)
  {
    if (typeof formData.initDate == 'string')
      formData.initDate = new Date(formData.initDate);
        
    formData.initDate = this.formatDate(formData.initDate);

    if (formData.endDate !== null && formData.endDate !== undefined && (formData.endDate instanceof Date))
      formData.endDate = this.formatDate(formData.endDate);

    let httpOptions = this.getHeader();

    return this.http.post<any>(`${this.apiUrl}/save`, formData, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  getFinancialStatement()
  {
    let httpOptions = this.getHeader();

    return this.http.get<any>(`${this.apiUrl}/`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  formatDate(date: Date)
  {
    let format = `${date.getFullYear()}`

    format += `-${(date.getMonth() + 1 < 10 ? 0 : '')}` + `${date.getMonth() + 1}`;
    format += `-${(date.getDate() + 1 < 10 ? 0 : '')}` + `${date.getDate() + 1}`;

    return format;
  }

  getHeader()
  {
    let token = this.localStorageService.getItem('Bearer token');

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token!}` })
    };

    return httpOptions;
  }

  public handleError(error: HttpErrorResponse)
  {
    if (error.status === 0)
      console.error("There was an error:\n\t", error.error);
    else
    {
      console.error(error);

      console.error("The Backend returned the code: " 
        + error.status + "\nBody: \n\t" 
        + (error.error.hasOwnProperty('message') ? error.error.message : 'something was wrong.')
      );
    }

    return throwError(() => error);
  }
}
