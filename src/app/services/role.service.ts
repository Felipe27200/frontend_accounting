import { inject, Injectable } from '@angular/core';

import { ErrorHandlerService } from '@services/error-handler.service';
import { LocalStorageService } from '@services/local-storage.service';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import Role from 'app/interface/role';
import { catchError } from 'rxjs';

import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private errorHandler: ErrorHandlerService = inject(ErrorHandlerService);
  private http: HttpClient = inject(HttpClient);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  prefix = environment.apiUrl + "/api/roles";

  constructor() { }

  getAll()
  {
    let httpOptions = this.getHeader();

    return this.http.get<Role[]>(`${this.prefix}/`, httpOptions)
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
}
