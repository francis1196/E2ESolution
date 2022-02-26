import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, throwError } from 'rxjs';
import { Industry, IndustryResponse } from './../interfaces/industry';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {

  apiURL = 'http://localhost:3000';
  page = 1;

  constructor(private http: HttpClient) { }

  // HttpClient API get() method => Fetch all industries list
  getAllIndustries(): Observable<IndustryResponse> {
    let url = `${this.apiURL}/industries`
    return this.http
      .get<IndustryResponse>(url, {observe: 'response'})
      .pipe(
        map(data => new IndustryResponse(Math.ceil(Number(data.headers.get('X-Total-Count'))/10), 
        (data.body ? data.body : []) as Industry[])), 
        catchError(this.handleError)
      );
  }

  // HttpClient API get() method => Fetch industries list with query
  getIndustries(page: number, query: string): Observable<IndustryResponse> {
    let url = `${this.apiURL}/industries?_page=${page}${query}`;
    return this.http
      .get<IndustryResponse>(url, {observe: 'response'})
      .pipe(
        map(data => new IndustryResponse(Math.ceil(Number(data.headers.get('X-Total-Count'))/10), 
        (data.body ? data.body : []) as Industry[])), 
        catchError(this.handleError)
      );
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
