import { HttpErrorResponse, HttpEvent, HttpHandlerFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { inject } from '@angular/core';
import { LocalStorageService } from '../services/local-storage.service';
import { Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

/**
 * INTERCEPTORS
 * 
 * These will be executed before any request
 * to check if it carries out the necessary things 
 * to move forward with the process.
 */
export function JwtInterceptor (req: HttpRequest<unknown>, next: HttpHandlerFn): Observable<HttpEvent<unknown>>
{
  const LOGIN_URL = "/api/login";
  const SIGNUP = "/api/signup";

  if (req.url === LOGIN_URL || req.url === SIGNUP)
    return next(req);

  /**
   * This will use the service created and make the DI 
   * to use its functionality here.
   */
  let token: string | any = inject(LocalStorageService).getItem("Bearer-token");
  let router: Router = inject(Router);

  /**
   * Here we clone the request to add the bearer token,
   * We must do this due to we can directly alter the 
   * content in the request object.
   */
  let newRequest = req.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });

  return next(newRequest).pipe(
    tap({
      next: (event) => {
        if (event instanceof HttpResponse && (event.hasOwnProperty("status") && event.status == 401))
        {
          router.navigate(["/login"]);
        }
      },
      error: (error) => {
        if (error instanceof HttpErrorResponse && (error.hasOwnProperty("status") && error.status == 401))
        {
          router.navigate(["/login"]);
        }
      }
    })
  );
};
