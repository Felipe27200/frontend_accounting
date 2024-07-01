import { CanActivateFn, Router } from '@angular/router';
import { LocalStorageService } from '../services/local-storage.service';
import { inject } from '@angular/core';


export const authGuard: CanActivateFn = (route, state) => {
  const localStorageService = inject(LocalStorageService);
  const router = inject(Router);
  
  let token = localStorageService.getItem("Bearer-token");

  if (token)
  {
    return true;
  }

  return router.navigate(['/login']);
};
