import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResult } from './ApiResult';
import { environment } from 'src/environments/environment';
import { IFormRequest } from './FormRequest';

@Injectable({
  providedIn: 'root'
})
export class FormService {
  private url = `${environment.API_KEY}${environment.FORM_URL}`;
  constructor(private http : HttpClient) { }

  getUsers(): Observable<IApiResult>{
    return this.http.get<IApiResult>(this.url);
  }

  postUser(postData : IFormRequest){
    console.log(postData)
  }
}
