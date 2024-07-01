import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, } from "rxjs/operators";
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private prefix = "/api";

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
  ) { }

  login(formData: any) {
    let url = `${this.prefix}/login`;

    return this.http.post<any>(url, formData, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  public handleError(error: HttpErrorResponse)
  {
    if (error.status === 0)
      console.error("There was an error:\n\t", error.error);
    else
    {
      console.error("The Backend returned the code: " 
        + error.status + "\nBody: \n\t" + error.error.errors);
    }

    return throwError(() => error);
  }
}
