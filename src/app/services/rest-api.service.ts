import { Industry } from './../iterfaces/industry';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }
  
  getNumberOfPages(): Observable<number> {
    let url = `${this.apiURL}/industries?_page=1`;
    return this.http
      .get<any>(url, {observe: 'response'})
      .pipe(map(data => Math.ceil(Number(data.headers.get('X-Total-Count'))/10), catchError(this.handleError)));
  }

  // HttpClient API get() method => Fetch industries list
  getAllIndustries(): Observable<Industry[]> {
    return this.http
      .get<Industry[]>(this.apiURL + '/industries')
      .pipe(retry(1), catchError(this.handleError));
  }

  // HttpClient API get() method => Fetch industries list
  getIndustriesPage(page: number): Observable<Industry[]> {
    let url = `${this.apiURL}/industries?_page=${page}`;
    return this.http
      .get<Industry[]>(url)
      .pipe(retry(1), catchError(this.handleError));
  }

  // Error handling
  handleError(error: any) {
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
