import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResult } from './ApiResult';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor(private http : HttpClient) { }

  getUsers(): Observable<IApiResult>{
    const url = `${environment.API_KEY}${environment.FORM_URL}`;
    return this.http.get<IApiResult>(url);
  }
}
