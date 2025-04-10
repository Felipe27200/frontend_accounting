import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';

import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  apiPrefix = 'api/accounts';

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService,
  ) { }

  createAccount(formData: any)
  {
    let httpOptions = this.getHeader();

    return this.http.post<any>(`${this.apiPrefix}/create`, formData, httpOptions)
      .pipe(catchError(this.handleError));
  }

  editAccount(formData: any, id: number)
  {
    let httpOptions = this.getHeader();

    return this.http.put<any>(`${this.apiPrefix}/${id}`, formData, httpOptions)
      .pipe(catchError(this.handleError));
  }
  
  deleteAccount(id: number)
  {
    let httpOptions = this.getHeader();

    return this.http.delete<any>(`${this.apiPrefix}/${id}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAccounts()
  {
    let httpOptions = this.getHeader();

    return this.http.get<any>(`${this.apiPrefix}/`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  getAccountsByStatementId(statementId: number | string)
  {
    let httpOptions = this.getHeader();
    let url = `${this.apiPrefix}/search-statement-id`

    return this.http.get<any>(`${url}/${+statementId}`, httpOptions)
      .pipe(catchError(this.handleError));
  }

  filterAccounts(formData: any)
  {
    let httpOptions = this.getHeader();

    return this.http.post<any>(`${this.apiPrefix}/filter-account`, formData, httpOptions)
      .pipe(catchError(this.handleError));
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

      let errorMessage ="The Backend returned the code: " 
        + error.status + "\nBody: \n\t";

      if (error.hasOwnProperty('error')
        && (error.error !== null && error.error !== undefined) 
        && error.error.hasOwnProperty('message') )
      {
        errorMessage += error.error.message;
      }
      else
        errorMessage += 'something was wrong.';

      console.error(errorMessage);
    }

    return throwError(() => error);
  }
}
