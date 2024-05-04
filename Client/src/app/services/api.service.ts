import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class APIService {

  baseApiUrl: string = environment.baseApiUrl;

  constructor(private http: HttpClient) { }

  // GET operation
  get<T>(endpoint: string): Observable<T[]> {
    return this.http.get<T[]>(this.baseApiUrl + endpoint);
  }

  // POST operation
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(this.baseApiUrl + endpoint, data);
  }

  // PUT operation
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(this.baseApiUrl + endpoint, data);
  }

  // DELETE operation
  delete<T>(endpoint: string, id: number): Observable<T> {
    return this.http.delete<T>(this.baseApiUrl + `${endpoint}/${id}`);
  }
  
}
