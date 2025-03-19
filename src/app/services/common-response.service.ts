import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonResponseService {

  constructor() { }

  setToastErrorMessage(error: any)
  {
    let listErrors = [];

    if (error.hasOwnProperty("error") && error.error.hasOwnProperty("message"))
      listErrors.push({ severity: 'error', summary: 'Error!', detail: error.error.message });

    if (Array.isArray(error.error.errors))
    {
      error.error.errors.forEach((element: any) => {
        listErrors.push({ severity: 'error', summary: 'Error!', detail: element });
      });
    }

    return listErrors;
  }
}
