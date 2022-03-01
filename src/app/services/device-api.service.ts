import { Observable, retry, map, catchError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Device, DeviceExpanded, WarehouseExpandedResponse, WarehouseResponse } from '../interfaces/warehouse';
import Utils from './servicesUtils';
import { httpOptions } from './servicesUtils';

@Injectable({
  providedIn: 'root'
})
export class DeviceApiService {

  apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  // HttpClient API get() method => Fetch Warehouse list with query
  getDevices(page: number, query: string): Observable<WarehouseResponse> {
    let url = `${this.apiURL}/devices?_page=${page}${query}&_sort=name`;
    return this.http
      .get<WarehouseResponse>(url, {observe: 'response'})
      .pipe(
        retry(1),
        map(data => new WarehouseResponse(Math.ceil(Number(data.headers.get('X-Total-Count'))/10), 
        (data.body ? data.body : []) as Device[])), 
        catchError(Utils.handleError)
      );
  }

  // HttpClient API get() method => Fetch Warehouse list with query
  getDevicesExpanded(page: number, query: string): Observable<WarehouseExpandedResponse> {
    let url = `${this.apiURL}/devices?_expand=industry&_page=${page}${query}&_sort=name`;
    return this.http
      .get<WarehouseExpandedResponse>(url, {observe: 'response'})
      .pipe(
        retry(1),
        map(data => new WarehouseExpandedResponse(Math.ceil(Number(data.headers.get('X-Total-Count'))/10), 
        (data.body ? data.body : []) as DeviceExpanded[])), 
        catchError(Utils.handleError)
      );
  }

  // HttpClient API get() method => Fetch Device list for industry with query
  getDevicesWithIndustry(industryId: number, page: number, query: string): Observable<WarehouseExpandedResponse> {
    let url = `${this.apiURL}/industry/${industryId}/devices?_expand=industry&_page=${page}${query}&_sort=name`;
    return this.http
      .get<WarehouseExpandedResponse>(url, {observe: 'response'})
      .pipe(
        retry(1),
        map(data => new WarehouseExpandedResponse(Math.ceil(Number(data.headers.get('X-Total-Count'))/10), 
        (data.body ? data.body : []) as DeviceExpanded[])), 
        catchError(Utils.handleError)
      );
  }

  // HttpClient API get() method => Fetch industries list with query
  getDevice(id: number): Observable<Device> {
    let url = `${this.apiURL}/devices/${id}`;
    return this.http
      .get<Device>(url)
      .pipe(
        retry(1),
        catchError(Utils.handleError)
      );
  }

  // HttpClient API get() method => Fetch industries list with query
  addDevice(device: Device): Observable<Device>{
    let url = `${this.apiURL}/devices`;
    return this.http
      .post<Device>(
        url,
        JSON.stringify(device), 
        httpOptions
      )
      .pipe(retry(1), catchError(Utils.handleError))
  }

  // HttpClient API get() method => Fetch industries list with query
  updateDevice(device: Device): Observable<Device> {
    let url = `${this.apiURL}/devices/${device.id}`;
    return this.http
      .put<Device>(
        url,
        JSON.stringify(device),
        httpOptions
      )
      .pipe(retry(1), catchError(Utils.handleError));
  }

  // HttpClient API get() method => Fetch industries list with query
  deleteDevice(id: any) {
    let url = `${this.apiURL}/devices/${id}`;
    return this.http
      .delete<Device>(url, httpOptions)
      .pipe(retry(1), catchError(Utils.handleError));
  }
}
