import { HttpHeaders } from "@angular/common/http";
import { throwError } from "rxjs";

// Http Options
export const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  }),
};

export default class Utils {
  
  // Error handling
  static handleError(error: any){
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error: ${error.message}`;
    }
    return throwError(() => {
      return errorMessage;
    });
  }
}