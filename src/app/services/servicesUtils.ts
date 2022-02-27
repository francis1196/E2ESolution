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
  static handleError(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(() => {
      return errorMessage;
    });
  }
}