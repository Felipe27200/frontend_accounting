import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Router } from '@angular/router';

import { LocalStorageService } from '@services/local-storage.service';
import { CustomToken } from 'app/interface/custom-token';

import { jwtDecode } from 'jwt-decode';

export const adminRoleGuard: CanActivateFn = (route, state) => {
  let localStorageService: LocalStorageService = inject(LocalStorageService);
  let router: Router = inject(Router);

  let item = localStorageService.getItem("Bearer-token");

  if (item == null || item == undefined
       || item == "" || typeof item !== "string")
  {
    router.navigate(["/"]);
    return false;
  }

  let token = jwtDecode<CustomToken>(item);
  let isAdmin = false;

  if (!token.hasOwnProperty("scope") || token.scope == null || token.scope == undefined)
  {
    router.navigate(["/accounts"]);
    return isAdmin;
  }

  if (Array.isArray(token.scope))
  {
    token.scope.forEach((element: any) => {
      if (element.toUpperCase().includes("ADMIN"))
        isAdmin = true;
    });
  }
  else if (typeof token.scope == 'string' && token.scope.toUpperCase().includes("ADMIN"))
    isAdmin = true;

  if (!isAdmin)
    router.navigate(["/accounts"]);

  return isAdmin;
};
