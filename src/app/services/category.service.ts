import { Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from "rxjs/operators";

import { LocalStorageService } from './local-storage.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiUrl = "api/categories";

  constructor(
    private http: HttpClient,
    private localStorageService: LocalStorageService
  ) { }

  getCategories()
  {
    let token = this.localStorageService.getItem('Bearer token');

    let httpOptions = {
      headers: new HttpHeaders({ 'Authorization': `Bearer ${token!}` })
    };

    return this.http.get<any>(`${this.apiUrl}/`, httpOptions)
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
