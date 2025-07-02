import { inject, Injectable } from '@angular/core';

import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, } from "rxjs/operators";
import { throwError } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

import { signup } from 'app/interface/signup';
import { LocalStorageService } from '@services/local-storage.service';
import { CustomToken } from 'app/interface/custom-token';
import { ErrorHandlerService } from '@services/error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private prefixLogin = "/api";
  private prefixUser = "/api/users";

  private localStorageService = inject(LocalStorageService);
  private errorHandler: ErrorHandlerService = inject(ErrorHandlerService);

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(
    private http: HttpClient,
  ) { }

  login(formData: any) {
    let url = `${this.prefixLogin}/login`;

    return this.http.post<any>(url, formData, this.httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  signup(formData: signup)
  {
    let url = `${this.prefixLogin}/signup`;

    return this.http.post<any>(url, formData, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUsers()
  {
    let url = `${this.prefixUser}/`;

    return this.http.get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUserById(id: number | string)
  {
    let url = `${this.prefixUser}/search/${+id}`;

    return this.http.get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  getUserByUsername(username: string)
  {
    let url = `${this.prefixUser}/search-username/${username}`;

    return this.http.get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  updateUserByAdmin(userId: number, user: any)
  {
    let url = `${this.prefixUser}/update-user/${+userId}`;

    return this.http.put<any>(url, user, this.getHeader())
      .pipe(catchError(this.handleError));
  }

  changePasswordUserByAdmin(userId: number, password: any)
  {
    let url = `${this.prefixUser}/change-password-admin/${+userId}`;

    return this.http.put<any>(url, password, this.getHeader())
      .pipe(catchError(this.handleError));
  }

  updateUser(formData: any)
  {
    let url = `${this.prefixUser}/update`;

    return this.http.put<any>(url, formData, this.getHeader())
      .pipe(catchError(this.errorHandler.handleError));
  }

  updatePassword(formData: any)
  {
    let url = `${this.prefixUser}/change-password`;

    return this.http.put<any>(url, formData, this.getHeader())
      .pipe(catchError(this.errorHandler.handleError));
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
    }

    return throwError(() => error);
  }

  public isAdmin(): boolean
  {
    let item = this.localStorageService.getItem("Bearer-token");
    let isAdmin = false;

    if (item == null || item == undefined
        || item == "" || typeof item !== "string")
    {
      return isAdmin;
    }
    
    let token = jwtDecode<CustomToken>(item);
  
    if (!token.hasOwnProperty("scope") || token.scope == null || token.scope == undefined)
      return isAdmin;
  
    if (Array.isArray(token.scope))
    {
      token.scope.forEach((element: any) => {
        if (element.toUpperCase().includes("ADMIN"))
          isAdmin = true;
      });
    }
    else if (typeof token.scope == 'string' && token.scope.toUpperCase().includes("ADMIN"))
      isAdmin = true;
      
    return isAdmin;
  }
}
