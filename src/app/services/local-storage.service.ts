import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to maanage the Browser's Local Storage 
 */
export class LocalStorageService {

  constructor() { }

  setItem(key: string, value: string)
  {
    localStorage.setItem(key, value);
  }

  getItem(key: string)
  {
    return localStorage.getItem(key);
  }

  removeItem(key: string)
  {
    localStorage.removeItem(key);
  }

  clear()
  {
    localStorage.clear();
  }
}
