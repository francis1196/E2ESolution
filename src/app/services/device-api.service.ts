import { Observable, retry, map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device, WarehouseResponse } from '../interfaces/warehouse';
import Utils from './servicesUtils'

@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {

  apiURL = 'http://localhost:3000/devices';

  constructor(private http: HttpClient) { }

  // HttpClient API get() method => Fetch Warehouse list with query
  getWarehouse(page: number, query: string): Observable<WarehouseResponse> {
    let url = `${this.apiURL}?_page=${page}${query}`;
    return this.http
      .get<WarehouseResponse>(url, {observe: 'response'})
      .pipe(
        retry(1),
        map(data => new WarehouseResponse(Math.ceil(Number(data.headers.get('X-Total-Count'))/10), 
        (data.body ? data.body : []) as Device[])), 
        catchError(Utils.handleError)
      );
  }
}
