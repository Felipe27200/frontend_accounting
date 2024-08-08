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

  getAccounts()
  {
    let httpOptions = this.getHeader();

    return this.http.get<any>(`${this.apiPrefix}/`, httpOptions)
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

      console.error("The Backend returned the code: " 
        + error.status + "\nBody: \n\t" 
        + (error.error.hasOwnProperty('message') ? error.error.message : 'something was wrong.')
      );
    }

    return throwError(() => error);
  }
}
