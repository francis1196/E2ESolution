import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, retry, } from 'rxjs';
import { Industry, IndustryResponse } from './../interfaces/industry';
import Utils from './servicesUtils';
import { httpOptions } from './servicesUtils';

@Injectable({
  providedIn: 'root'
})
export class IndustryApiService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // HttpClient API get() method => Fetch all industries list
  getAllIndustries(): Observable<IndustryResponse> {
    let url = `${this.apiURL}/industries`
    return this.http
      .get<IndustryResponse>(url, {observe: 'response'})
      .pipe(
        retry(1),
        map(data => new IndustryResponse(Math.ceil(Number(data.headers.get('X-Total-Count'))/10), 
        (data.body ? data.body : []) as Industry[])), 
        catchError(Utils.handleError)
      );
  }

  // HttpClient API get() method => Fetch industries list
  getIndustries(page: number, query: string): Observable<IndustryResponse> {
    let url = `${this.apiURL}/industries?_page=${page}${query}&_sort=name`;
    return this.http
      .get<IndustryResponse>(url, {observe: 'response'})
      .pipe(
        retry(1),
        map(data => new IndustryResponse(Math.ceil(Number(data.headers.get('X-Total-Count'))/10), 
        (data.body ? data.body : []) as Industry[])), 
        catchError(Utils.handleError)
      );
  }

  // HttpClient API get() method => Fetch industry
  getIndustry(id: number): Observable<Industry> {
    let url = `${this.apiURL}/industries/${id}`;
    return this.http
      .get<Industry>(url)
      .pipe(
        retry(1),
        catchError(Utils.handleError)
      );
  }

  // HttpClient API post() method => Add industry
  addIndustry(industry: Industry): Observable<Industry>{
    let url = `${this.apiURL}/industries`;
    return this.http
      .post<Industry>(
        url,
        JSON.stringify(industry), 
        httpOptions
      )
      .pipe(retry(1), catchError(Utils.handleError))
  }

  // HttpClient API put() method => Update industry
  updateIndustry(industry: Industry): Observable<Industry> {
    let url = `${this.apiURL}/industries/${industry.id}`;
    return this.http
      .put<Industry>(
        url,
        JSON.stringify(industry),
        httpOptions
      )
      .pipe(retry(1), catchError(Utils.handleError));
  }

  // HttpClient API delete() method => Delete industry
  deleteIndustry(id: any) {
    let url = `${this.apiURL}/industries/${id}`;
    return this.http
      .delete<Industry>(url, httpOptions)
      .pipe(retry(1), catchError(Utils.handleError));
  }
}
