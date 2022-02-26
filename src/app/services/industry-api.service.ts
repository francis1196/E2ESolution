import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, } from 'rxjs';
import { Industry, IndustryResponse } from './../interfaces/industry';
import Utils from './servicesUtils'

@Injectable({
  providedIn: 'root'
})
export class IndustryApiService {

  apiURL = 'http://localhost:3000/industries';

  constructor(private http: HttpClient) { }

  // HttpClient API get() method => Fetch all industries list
  getAllIndustries(): Observable<IndustryResponse> {
    let url = `${this.apiURL}`
    return this.http
      .get<IndustryResponse>(url, {observe: 'response'})
      .pipe(
        retry(1),
        map(data => new IndustryResponse(Math.ceil(Number(data.headers.get('X-Total-Count'))/10), 
        (data.body ? data.body : []) as Industry[])), 
        catchError(Utils.handleError)
      );
  }

  // HttpClient API get() method => Fetch industries list with query
  getIndustries(page: number, query: string): Observable<IndustryResponse> {
    let url = `${this.apiURL}?_page=${page}${query}`;
    return this.http
      .get<IndustryResponse>(url, {observe: 'response'})
      .pipe(
        retry(1),
        map(data => new IndustryResponse(Math.ceil(Number(data.headers.get('X-Total-Count'))/10), 
        (data.body ? data.body : []) as Industry[])), 
        catchError(Utils.handleError)
      );
  }
}
